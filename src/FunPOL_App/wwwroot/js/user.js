$(document).ready(function () {
    $.get('@Url.Action("UserDetails","User", new { area = "user" })', function (data) {
        $("#tblUser").html(data);
    });
});
