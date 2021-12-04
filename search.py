import frappe
from jinja2 import utils
from frappe import _
from frappe.utils import sanitize_html

@frappe.whitelist(allow_guest = True)
def converttoword(query):
    return (query.split())
def searchlist(query,source,field):
    for q in query:
        if q.lower() in source[field].lower():
            return True
    return False
def get_context(context):
    if frappe.form_dict.q:
        q = str(utils.escape(sanitize_html(frappe.form_dict.q)))
        query = converttoword(q)
        items = frappe.db.get_all('Website Item',fields=['route','image','web_item_name','item_code','item_group','tags_list'])
        itemGroup = frappe.db.get_all('Item Group',fields=['item_group_name','parent_item_group','show_in_website','route'])
        priceList = frappe.db.get_all('Item Price',fields=['item_code','price_list','selling','price_list_rate'])
        context.query = q
        out = []
        grp = []
        final = []
        for item in items:
            if searchlist(query,item,'web_item_name') or searchlist(query,item,'item_group'):
                for price in priceList:
                    if price['item_code'] == item['item_code']:
                        item['price']=price['price_list_rate']
                        out.append(item)
                        break
            if(item['tags_list'] is not None):
                if searchlist(query,item,'tags_list'):
                    for price in priceList:
                        if price['item_code'] == item['item_code']:
                            item['price']=price['price_list_rate']
                            out.append(item)
                            break
        for o in out:
            if o in final:
                continue
            else:
                final.append(o)
        for group in itemGroup:
            if group["show_in_website"] == 1:
                if searchlist(query,group,'item_group_name'):
                    grp.append(group)
                elif searchlist(query,group,'parent_item_group'):
                    grp.append(group)
        context.items = final
        context.groups = grp
    else:
        context.query = "nothing"




    







