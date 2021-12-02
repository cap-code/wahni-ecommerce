import frappe
from jinja2 import utils
from frappe import _
from frappe.utils import sanitize_html

@frappe.whitelist(allow_guest = True)
def get_context(context):
    if frappe.form_dict.q:
        query = str(utils.escape(sanitize_html(frappe.form_dict.q)))
        items = frappe.db.get_all('Website Item',fields=['route','image','web_item_name','new_items','new_deals','item_code','item_group','tags_list'])
        itemGroup = frappe.db.get_all('Item Group',fields=['item_group_name','parent_item_group','show_in_website','route'])
        priceList = frappe.db.get_all('Item Price',fields=['item_code','price_list','selling','price_list_rate'])
        context.query = query
        out = []
        grp = []
        final = []
        for item in items:
            if query.lower() in item['web_item_name'].lower() or query.lower() in item['item_group'].lower():
                for price in priceList:
                    if price['item_code'] == item['item_code']:
                        item['price']=price['price_list_rate']
                        out.append(item)
                        break
            if(item['tags_list'] is not None):
                if query.lower() in item['tags_list'].lower():
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
                if query.lower() in group['item_group_name'].lower():
                    grp.append(group)
                elif query.lower() in group['parent_item_group'].lower():
                    grp.append(group)
        context.items = final
        context.groups = grp
    else:
        context.query = "nothing"


    







