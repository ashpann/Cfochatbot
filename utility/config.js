module.exports.logoToDisplay = ['SAPLogo', 'Salesforce']
module.exports.errorMessage = "error occured"
module.exports.listCardAction = { 
    "opportunity": "opportunityDetail",
    "sales": "salesDetail",
    "receiveables": "receiveablesDetail",
    "invoice": "invoiceDetail",
    "pr": "prDetail",
    "po": "poDetail"
}
module.exports.personaList = [ {
    "nameToDisplay": "Purchase Manager",
    "logo": "Purchasemanager"
}, {
    "nameToDisplay": "CFO",
    "logo": "CFOLogo"
}]
module.exports.cardTitle = {
    "customerList": "Please select an Account to Manage",
    "customerProfile": "Account Detail",
    "accountManagerServiceList": "Please select a service",
    "opportunityListCard": "Please select an Opportunity",
    "opportunityDetailCard": "Opportunity Detail",
    "salesListCard": "Please select a Sales Order",
    "salesDetailCard": "Sales Order Detail",
    "receiveablesListCard": "Please select a Receiveable",
    "receiveablesDetailCard": "Receivable Detail",
    "invoiceListCard": "Please select an Invoice",
    "invoiceDetailCard": "Invoice Detail",
    "prListCard": "Please select a Purchase Requisition",
    "prDetailCard": "Purchase Requisition Detail",
    "poListCard": "Please select a Purchase Order",
    "poDetailCard": "Purchase Order Detail",
    "cfoDashboard": "CFO Dashboard",
    "createOpportunity": "Create Opportunity",
    "createOpportunityAccountList": "Please select an Account to Create Opportunity"
}
module.exports.userProfileGraphTitle = ['Gross Profit', 'Total Sales']
module.exports.CFOserviceList = ['Home']
module.exports.accountManagerServiceList = ['Opportunities', 'Create Opportunity', 'Sales', 'Invoices', 'Receivables', 'Switch Account', 'Home']

module.exports.purchaseManagerServiceList = [
    'Spend By Heads', 'Direct vs Indirect', 'Planned vs Actual', 'Team Members',
    'Purchase Requisitions', 'Purchase Orders', 'Home']

module.exports.prDetailCard = [{
    "lableValue": "PR Number",
    "columnValue": "id"
},
{
    "lableValue": "Created Date",
    "columnValue": "date"
},
{
    "lableValue": "Description",
    "columnValue": "Description"
},
{
    "lableValue": "Quantity",
    "columnValue": "Quantity"
},
{
    "lableValue": "Status",
    "columnValue": "Status"
},
{
    "lableValue": "Unit Price",
    "columnValue": "UnitPrice"
},
{
    "lableValue": "Amount",
    "columnValue": "Amount"
}]
module.exports.poDetailCard = [{
    "lableValue": "PO Number",
    "columnValue": "id"
},
{
    "lableValue": "PO Date",
    "columnValue": "date"
},
{
    "lableValue": "Description",
    "columnValue": "Description"
},
{
    "lableValue": "Quantity",
    "columnValue": "Quantity"
},
{
    "lableValue": "Status",
    "columnValue": "Status"
},
{
    "lableValue": "Unit Price",
    "columnValue": "UnitPrice"
},
{
    "lableValue": "Amount",
    "columnValue": "Amount"
}]

module.exports.procurmentTeamCard = [{
    "lableValue": "Compliance",
    "columnValue": "Compliance"
},
{
    "lableValue": "Spend This Month",
    "columnValue": "SpendThisMonth"
},
{
    "lableValue": "Total Spend",
    "columnValue": "TotalSpend"
},
{
    "lableValue": "Target this Month",
    "columnValue": "TargetThisMonth"
}]

