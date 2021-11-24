import frappe

# def get_context(context):
#     context.data = frappe.db.get_all('Website Item',fields=['route','image','web_item_name','new_items','new_deals',])
def get_context(context):
    context.data = frappe.db.get_all('Website Item',fields=['route','image','web_item_name','new_items','new_deals','item_code'])
    context.price = frappe.db.get_all('Item Price',fields=['item_code','price_list','selling','price_list_rate'])

