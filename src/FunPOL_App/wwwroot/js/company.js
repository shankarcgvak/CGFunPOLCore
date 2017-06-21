$(document).ready(function () {
    $.get('@Url.Action("CompanyDetails","Company", new { area = "company" })', function (data) {
        $("#tblCompany").html(data);
    });
});

function Bind(output) {

    $('#loadDropDown').CreateControl(
   {
       backgroundColor: "",
       headerID: "txtHeader1",
       header: ["Period", "Invoice"],
       control: "checkedDropdown",
       dropData: output,
       displayMember: "DisplayMember2",
       valueMember: "DisplayMember1",
       columns: ["DisplayMember1", "DisplayMember2", "DisplayMember3"]
   });
}

$(function () {
    $.ajax({
        url: "/DropDown/GetDropDownData",
        type: 'Get',
        dataType: "json",

        success: function (result) {
            Bind(result);
        },
        error: function failCallBk(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error occurred while processing your request. Please try again.");
        }
    });
});