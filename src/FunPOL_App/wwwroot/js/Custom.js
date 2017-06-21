//var table = {
//    tableId: "tblUser",
//    tableObj: "table#tblUser",
//    includeSummary: true,
//    exportFileName: "User",
//    currenyType: "JPY",
//    currSymbol: function () {
//        return currency_symbols[this.currenyType];
//    }
//};

//var currency_symbols = {
//    'USD': '$', // US Dollar
//    'EUR': '€', // Euro
//    'CRC': '₡', // Costa Rican Colón
//    'GBP': '£', // British Pound Sterling
//    'ILS': '₪', // Israeli New Sheqel
//    'INR': '₹', // Indian Rupee
//    'JPY': '¥', // Japanese Yen
//    'KRW': '₩', // South Korean Won
//    'NGN': '₦', // Nigerian Naira
//    'PHP': '₱', // Philippine Peso
//    'PLN': 'zł', // Polish Zloty
//    'PYG': '₲', // Paraguayan Guarani
//    'THB': '฿', // Thai Baht
//    'UAH': '₴', // Ukrainian Hryvnia
//    'VND': '₫', // Vietnamese Dong
//};

//$(function () {
//    //DataTable should be added to prevent the darkening of alterate rows in PDF Export - Issue in PDF
//    $(table.tableObj).dataTable({
//        dom: 'Bfrtip',
//        "bFilter": false, //Complete grid filter with textbox
//        "sPaginationType": "full_numbers",
//        "iDisplayLength": 5, //Default number selected in dropdown
//        "aLengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]], //To show how many records from the table
//        "bInfo": false, //Hide Showing n records of the total
//        "bText": 'Export',
//        "aButtons": [
//             {
//                 "sExtends": "csv",
//                 "sButtonText": "Download Excel"
//             },
//             {
//                 "sExtends": "pdf",
//                 "sButtonText": "Download PDF",
//                 "sPdfOrientation": "landscape"
//             }
//        ],
//        "aoColumnDefs": [{
//            "bSortable": false,
//            "aTargets": ["sorting_disabled"] //Add this class to columns that is sorting disabled
//        }],

//    });

//    var controlWrapper; // main wrapper for generating conrols

//    $.fn.CreateControl = function (options) {

//        // default parameters for creating controls
//        var defaults = {
//            control: enumControl.checkedDropdown,  // type of control need . default vale is checked dropdown
//            backgroundColor: "", // checked backgroung color
//            headerSize: "2", // haeder size (header count)
//            headerID: "txtHeader",
//            height: "75",
//            textColor: "#000",
//            fontSize: "1em",
//            delayDuration: 400, // transistions if need TODO: Need to extend the animation 
//            animateOpacity: true, //TODO: Need to extend the animation 
//            animationDuration: 500, //TODO: Need to extend the animation 
//            header: [], // Header text array
//            dropData: [],// array of data to display
//            displayMember: "",
//            valueMember: "",
//            columns: [],
//            value: []
//        };

//        var settings = $.extend({}, defaults, options);
//        var data = settings.dropData;

//        backColor = settings.backgroundColor;

//        if (settings.control == enumControl.checkedDropdown) {

//            controlWrapper = ' <div class="input-group-btn"> <input tabindex="-1" value="Select" readonly  id= "' + settings.headerID + '" style="WIDTH: 400PX;TEXT-OVERFLOW: ellipsis;" class="btn btn-default  dropdown-toggle" data-toggle="dropdown" type="TEXT" /> ';
//            controlWrapper += ' <button tabindex="-1" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button">   <span class="caret"></span>   </button> '
//            controlWrapper += ' <table role="menu" style="width:430px; overflow-y: auto; height:350px;  overflow-x: auto;" id="ddlMenu"  class="dropdown-menu table-bordered table-condensed table-responsive">    <thead> <tr>'

//            $.each(settings.header, function (index, value) {
//                if (index == 0) {
//                    controlWrapper += ' <th>' + "Select" + '</th>';
//                    controlWrapper += ' <th>' + value + '</th>';
//                } else {
//                    controlWrapper += ' <th>' + value + '</th>';
//                }

//            });
//            controlWrapper += ' </tr> </thead>';

//            $(data).each(function (i, val) {
//                controlWrapper += '<tr onmouseover="changemouseover(this)"  onmouseout="changemouseout(this)">'
//                $.each(val, function (key, val1) {
//                    if (settings.columns.indexOf(key) > 0) {
//                        if (key == settings.displayMember) {
//                            controlWrapper += '  <td class="chkbox" style="width:60px"><input type="checkbox" onClick="ChangePropStatus(this);" id="chkbox1" value=' + val1 + ' style="width:85 %"></td> '
//                            controlWrapper += ' <td id="lang1" style="width:150px">' + val1 + '</td>'
//                        }
//                        else {
//                            controlWrapper += '<td id="lang1" style="width:300px">' + val1 + '</td>'
//                        }
//                    }
//                });
//                controlWrapper += ' </tr>'
//            });
//            controlWrapper += ' </tbody>  </table>  </div> '
//        }
//        $(this).html(controlWrapper);
//    };

//    var enumControl = {
//        dropdown: 1,
//        checkedDropdown: 2
//    };
//});

//var backColor;

//function changemouseover(control) {
//    control.style.backgroundColor = "";
//}

//function changemouseout(control) {
//    $(":checkbox").each(function (idx, item) {
//        if ($(item).prop('checked')) {
//            $(item).closest('tr').css('background-color', backColor);
//        }
//        else {
//            control.style.backgroundColor = "#fff";
//        }
//    })
//}


//function ChangePropStatus(control) {
//    $("#txtHeader1").val('');
//    $(":checkbox").each(function (idx, item) {
//        if ($(item).prop('checked')) {
//            $(item).closest('tr').css('background-color', backColor);


//            if ($("#txtHeader1").val() == "") {
//                $("#txtHeader1").val($("#txtHeader1").val() + $(item).val());
//            }
//            else {
//                $("#txtHeader1").val($("#txtHeader1").val() + ',' + $(item).val());
//            }
//        }
//        else {

//            $(item).closest('tr').css('background-color', "white");
//        }
//    });

//}



//$(document).ready(function () {
//    //1st Param = Export to PDF , 2nd Param = Export to CSV , 3rd Param = TableName , 4th Param = FileName
//    ExportGrid(true, true, table.tableId, table.exportFileName);

//    //PDF export button click event
//    $("#pdfExport").click(function () {
//        summarySection(table.tableObj); //If not included, it will not load summary section when column is not clicked even once, as the value will not be computed at that instant
//        var tableName = $("#pdfExport").attr('data-tableName');
//        var fileName = $("#pdfExport").attr('data-fileName');
//        exportPdf(tableName);
//    });

//    //CSV export button click event
//    $("#csvExport").on('click', function (event) {
//        summarySection(table.tableObj); //If not included, it will not load summary section when column is not clicked even once, as the value will not be computed at that instant
//        var tableName = $("#csvExport").attr('data-tableName'); //Gets the tableName from ExportGrid function call
//        var fileName = $("#csvExport").attr('data-fileName');   //Gets the fileName from ExportGrid function call
//        var args = [$('#' + tableName)];
//        exportTableToCSV.apply(this, args);
//    });

//    //Iterate through all columns with currency class and add the currency symbol.
//    $(".currency").each(function () {
//        var thIndex = $(this).index() + 1;
//        var currencySymbol = table.currSymbol();

//        $(table.tableObj + " td:nth-child(" + thIndex + ")").not('tfoot td').each(function () {
//            var text = this.innerText;
//            if (text != undefined && text != "") {
//                var currency = currencyFormat(text, currencySymbol);
//                this.innerText = currency;
//            }
//        });
//    });

//    $('table th').each(function () {
//        $('table tfoot tr').append('<td><span id="countFooterSummary" style="display:none;"></span><br /><span id="sumFooterSummary" style="display:none;"></span><br /><span id="minFooterSummary" style="display:none;"></span><br /><span id="maxFooterSummary" style="display:none;"></span></td>')

//        //Get Column Type of Column
//        var colType = $(this).attr('data-columnType');
//        //Get the column index
//        var colIndex = $(this).attr('data-index');
        
//        //Get If Column is filterable
//        var colFilter = $(this).attr('data-filterable');

//        //For Text type disable mathematical operations
//        if (colType == "text") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);" disabled="disabled" /> Sum</li><li><input id="min" type="checkbox" name="min" disabled="disabled" data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max" disabled="disabled" type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');
//        }

//        //For Number enable mathematical operations
//        else if (colType == "number") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);"  /> Sum</li><li><input id="min" type="checkbox" name="min"  data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max"  type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');
//        }

//        //Set Column Filter Icon
//        if (colFilter == "true") {
//            $(this).append('<div data-html2canvas-ignore class="dropdown pull-right" id="filter"><button class="btn-xs btn-basic dropdown-toggle" type="button" data-toggle="dropdown"><span class="glyphicon glyphicon-filter"></span></button><ul class="dropdown-menu"><li><input class="glyphicon glyphicon-search" id="filterText" type="text" name="filter" data-index="' + colIndex + '" onkeyup="filterColumn(this);" /></li></ul></div>')
//        }
//    });

//    //Add Selected row CSS
//    $(table.tableObj + ' tbody tr').on('click', function () {
//        $(this).closest("tr").siblings().removeClass("selected"); //To remove any existing selected row css
//        $(this).closest("tr").siblings().find('td:nth-child(1) span').remove(); // Remove glyphicon for the selected row

//        $(this).addClass('selected'); // Add selected row CSS
//        //Check if span tag is already present
//        if ($('.rowSelect').length) {
//            $(this).closest("tr").siblings().find('td:nth-child(1) span').remove();
//        }
//        else {
//            $($(this).find('td:nth-child(1)')[0]).append('<span class="rowSelect glyphicon glyphicon-chevron-right" style="font-size: 0.8em;"></span>'); //Size 0.8em is set to have a reduced glyphicon size
//        }
//    });

//    //Modal Popup for edit row
//    $(table.tableObj + ' tbody tr').on('dblclick', function () {
//        $('#popUpModal').modal('show');
//    });

//    //$('.colHeader').each(function () {
//    //    //Column Header
//    //    var text = $(this).clone().find('div').remove().end().text();
//    //    var show = $(this).attr('data-show');
//    //    var colIndex = $(this).attr('data-index');
//    //    if (show == "true") {
//    //        //Check the checkbox in the column Header
//    //        $("#divColHeader .dropdown-menu").append('<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" checked="checked" onchange="changeColHeader(this);"/> ' + text + ' </li>')
//    //        //Show the column in Table
//    //        showColumn(colIndex)
//    //    }
//    //    else {
//    //        //Un Check the checkbox in the column Header
//    //        $("#divColHeader .dropdown-menu").append('<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" onchange="changeColHeader(this);""/> ' + text + ' </li>');
//    //        //Hide the column in Table
//    //        hideColumn(colIndex);
//    //    }
//    //});
//    //Show/Hide Column and set the column header functionality
//    Reorder();
//})

////Include/Exclude Summary section in table export
//var includeSummaryChange = function (e) {
//    if (e.checked) {
//        table.includeSummary = true;
//    }
//    else {
//        table.includeSummary = false;
//    }
//}


//var ExportGrid = function (pdf, csv, tableName, fileName) {
//    exportToPdf = pdf;
//    exportToCsv = csv;
//    fileName = fileName;

//    if (exportToPdf) {
//        $("#exportDiv .dropdown-menu").append("<li  class='export'><a id='pdfExport' href='#' data-fileName=" + fileName + " data-tableName=" + tableName + ">PDF</a></li>")
//    }

//    if (exportToCsv) {
//        $("#exportDiv .dropdown-menu").append("<li ><a id='csvExport' href='#'  data-fileName=" + fileName + " data-tableName=" + tableName + ">CSV</a></li>")

//    }
//    if (!exportToCsv && !exportToPdf) {
//        $("#exportDiv").hide();
//    }
//}

////PDF with AutoTable Plugin
////<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.0/jspdf.plugin.autotable.js"></script>
//var exportPdf = function (tableName) {
//    var doc = new jsPDF('p', 'pt', 'letter', true);
//    var tableObj = $('#' + tableName);
//    $table = $(tableObj).clone();

//    if (!table.includeSummary) {
//        //if not cloned main table total summary will be removed
//        $table.find("#summary").remove();
//        $table.find("#totalSummary").remove(); //Remove Summary row if present in the Grid
//    }

//    //Remove first column
//    $table.find('tr th:nth-child(1), tr td:nth-child(1)').remove();

//    var res = doc.autoTableHtmlToJson($table[0]);

//    //Added columns explicitly, Includes span text elements if not included.
//    var cols = [];
//    $.each(res.columns, function (key, data) {
//        cols.push($(data).find('div').remove().end().text());
//    })



//    doc.autoTable(cols, res.data, {
//        styles: {
//            overflow: 'linebreak',
//            columnWidth: 'auto' //Column Width will vary as per the cell value
//        }
//    });
//    doc.save(table.exportFileName + ".pdf");
//}

////Export to CSV related Functions
//function exportTableToCSV($table) {
//    $table = $table.clone(); //if not cloned main table total summary will be removed
//    $table.find("#totalSummary").remove(); //Remove Summary row if present in the Grid
//    $table.find('tr th:nth-child(1), tr td:nth-child(1)').remove();
//    if (!table.includeSummary) {
//        $table.find("#summary").remove();
//    }
//    else {
//        $table1 = $table.clone();
//        $table1.find("#summary").remove();
//        $table1.find('tbody').append($table.find('tfoot'));

//        $table = $table1;
//    }

//    var $rows = $table.find('tr'),
//      tmpColDelim = String.fromCharCode(11), // vertical tab character
//      tmpRowDelim = String.fromCharCode(0), // null character

//      // actual delimiter characters for CSV format
//      colDelim = '","',
//      rowDelim = '"\r\n"',

//      csv = '"' + $rows.map(function (i, row) {
//          var $row = $(row),
//            $cols = $row.find('th,td'); //td and th elements to be exported

//          return $cols.map(function (j, col) {
//              var $col = $(col),
//                text = $col.text();
//              return text.replace(/"/g, '""');

//          }).get().join(tmpColDelim);

//      }).get().join(tmpRowDelim)
//      .split(tmpRowDelim).join(rowDelim)
//      .split(tmpColDelim).join(colDelim) + '"';

//    if (false && window.navigator.msSaveBlob) {

//        var blob = new Blob([decodeURIComponent(csv)], {
//            type: 'text/csv;charset=utf8'
//        });

//        window.navigator.msSaveBlob(blob, table.exportFileName + '.csv');

//    } else if (window.Blob && window.URL) {
//        var blob = new Blob([csv], {
//            type: 'text/csv;charset=utf-8'
//        });
//        var csvUrl = URL.createObjectURL(blob);

//        $(this)
//          .attr({
//              'download': table.exportFileName + '.csv',
//              'href': csvUrl
//          });
//    } else {
//        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

//        $(this)
//          .attr({
//              'download': table.exportFileName + '.csv',
//              'href': csvData,
//              'target': '_blank'
//          });
//    }
//}

////Summary Section Begins
////Iterate through each column and row to get the count, min, max and sum values column wise
//function summarySection(tableId) {
//    var currencySymbol = table.currSymbol();
//    var result = [], count = [], min = {}, max = {}; //Variables used in Summary Section
//    //Iterate through each column and row to get the count, min, max and sum values column wise
//    $(tableId + ' tr:visible').not('thead tr').not('tfoot tr').each(function () {
//        $('td', this).each(function (index, val) {
//            if ($(val).text() != "") {
//                count[index] = count[index] == undefined ? 1 : count[index] + 1;
//            }

//            //Check if the column is number or empty
//            //If the column is of number type
//            if ($($(tableId + " th")[index]).attr('data-columntype') == "number") {
//                if ($(val).text() != "") {
//                    var colValue = $(val).text().replace(currencySymbol, "").replace(/,/g, ""); //Replace currency and comma for cuurency columns
//                    if (!result[index]) {
//                        result[index] = 0; //If no value is present, set 0 by default
//                    }

//                    result[index] += parseFloat(colValue);

//                    //Compute Minimum - Add current td element to Min array
//                    if (!min[index])
//                        min[index] = [];
//                    min[index].push(parseFloat(colValue));

//                    //Compute Maximum - Add current td element to Max array
//                    if (!max[index])
//                        max[index] = [];
//                    max[index].push(parseFloat(colValue));
//                }
//            }
//            else {
//            }
//        });
//    });

//    $(count).each(function (index) {
//        //Get Column min value
//        if (min[index] != undefined) {
//            var minCol = Math.min.apply(0, min[index]);
//        }

//        //Get Column max value
//        if (max[index] != undefined) {
//            var maxCol = Math.max.apply(0, max[index]);
//        }

//        //If the column is of number type
//        if ($($(tableId + " th")[index]).attr('data-columntype') == "number") {
//            if (result[index] != undefined) {
//                if ($($(tableId + " th")[index]).hasClass('currency')) {
//                    setSummaryValue(index, count[index], result[index], minCol, maxCol, true);
//                }
//                else {
//                    setSummaryValue(index, count[index], result[index], minCol, maxCol, false);
//                }
//            }
//            else {
//                setSummaryValue(index, 0, 0, 0, 0, false);
//            }
//        }

//            //If the column is of text type
//        else if ($($(tableId + ' th')[index]).attr('data-columntype') == "text") {
//            $(tableId + ' tr').find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count[index]);
//        }
//    });

//    if (count == undefined || count == 0) {
//        $(tableId + ' tfoot tr td').each(function (index) {
//            if ($($(tableId + ' th')[index]).attr('data-columntype') == "number") {
//                if (result[index] != undefined) {
//                    setSummaryValue(index, 0, 0, 0, 0, false);
//                }
//                else {
//                    setSummaryValue(index, 0, 0, 0, 0, false);
//                }
//            }
//            else {
//                $(tableId + ' tr').find('td:eq(' + index + ') #countFooterSummary').text(' Count: 0 ');
//            }
//        });
//    }
//}

//var currencySymbol = table.currSymbol();

////Set the summary section value
//function setSummaryValue(index, count, sum, min, max, hasCurrency) {
//    if (hasCurrency) {
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #sumFooterSummary').text(' Sum: ' + currencySymbol + sum);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #minFooterSummary').text(' Minimum: ' + currencySymbol + min);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #maxFooterSummary').text(' Maximum: ' + currencySymbol + max);
//    }
//    else {
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #sumFooterSummary').text(' Sum: ' + sum);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #minFooterSummary').text(' Minimum: ' + min);
//        $(table.tableObj + " tr").find('td:eq(' + index + ') #maxFooterSummary').text(' Maximum: ' + max);
//    }

//}
////Summary Section Ends

////Column Header event
////Column Header event
//function colHeaderEvent(e) {
//    $("#divColHeaderModal").modal('show');
//    //$("#divColHeader").toggleClass("open");
//    //$("div#divColHeader span").attr("aria-expanded","true");
//    e.stopPropagation();
//}

////Change event of Grid Column Header
//function changeColHeader(e) {
//    var colIndex = $(e).attr('data-index'); //Get the current Column Index
    
//    //Checked event to show column
//    if (e.checked) {
//        showColumn(colIndex)
//    }
//        //UnChecked event to hide column
//    else {
//        hideColumn(colIndex);
//    }
//}

////Hide Table Column
//function hideColumn(index) {
//    //var index = parseInt(temp) + 1;
//    $(table.tableObj).find("td:nth-child(" + index + ")").hide(); //Hide all td in the column
//    $(table.tableObj).find("th:nth-child(" + index + ")").hide(); //Hide the header for the corresponding column
//    ResetIndex(); //If Index is not reset, summary section will be affected
//}

////Show Table Column
//function showColumn(index) {
//    $(table.tableObj).find("td:nth-child(" + index + ")").show(); //Show all td in the column
//    $(table.tableObj).find("th:nth-child(" + index + ")").show(); //Show the header for the corresponding column
//    ResetIndex(); //If Index is not reset, summary section will be affected
//}

////Reset Column Index
//function ResetIndex() {
//    $(table.tableObj).find("tr .colHeader").each(function (index) {
//        $(this).attr("index", index);
//        $(this).attr("data-index", index+1);
//    });
//}

////Checkbox checked/unchecked event
//function handleChange(e) {
//    //Get the updated Summary Section
//    summarySection(table.tableObj);
//    var colIndex = $(e).closest('th').attr('index'); //Gets column Index
//    var summaryType = $(e).attr('data-summaryType'); //Gets the summary type to be displayed
//    //Checked event to show the summary details
//    if (e.checked) {
//        showSummary(colIndex, summaryType);
//    }
//        //UnChecked event to hide the summary details
//    else {
//        hideSummary(colIndex, summaryType);
//    }
//}

////Show Summary section for the corresponding column and for the corresponding type
//function showSummary(colIndex, summaryType) {
//    if (summaryType == "count")
//        $('tfoot').find('td:eq(' + colIndex + ') #countFooterSummary').removeAttr('style');
//    else if (summaryType == "sum")
//        $('tfoot').find('td:eq(' + colIndex + ') #sumFooterSummary').removeAttr('style');
//    else if (summaryType == "min")
//        $('tfoot').find('td:eq(' + colIndex + ') #minFooterSummary').removeAttr('style');
//    else if (summaryType == "max")
//        $('tfoot').find('td:eq(' + colIndex + ') #maxFooterSummary').removeAttr('style');
//}

////Hide Summary section for the corresponding column and for the corresponding type
//function hideSummary(colIndex, summaryType) {
//    if (summaryType == "count")
//        $('tfoot').find('td:eq(' + colIndex + ') #countFooterSummary').attr('style', 'display:none');
//    else if (summaryType == "sum")
//        $('tfoot').find('td:eq(' + colIndex + ') #sumFooterSummary').attr('style', 'display:none');
//    else if (summaryType == "min")
//        $('tfoot').find('td:eq(' + colIndex + ') #minFooterSummary').attr('style', 'display:none');
//    else if (summaryType == "max")
//        $('tfoot').find('td:eq(' + colIndex + ') #maxFooterSummary').attr('style', 'display:none');
//}

////Curreny Format
//function currencyFormat(n, currency) {
//    return currency + "" + n.replace(/./g, function (c, i, a) {
//        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
//    });
//}


////Individual Column Filter
//function filterColumn(e) {
//    var colIndex = $(e).attr('data-index'); //Gets column Index
//    var filter, closestTable, tr, td, i;
//    filter = e.value.toUpperCase();
//    closestTable = $(e).closest('table')[0];
//    tr = $(closestTable).find('tr').not('thead tr').not('tfoot tr');
//    for (i = 0; i < tr.length; i++) {
//        td = tr[i].getElementsByTagName("td")[colIndex];
//        if (td) {
//            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//                tr[i].style.display = "";
//            } else {
//                tr[i].style.display = "none";
//            }
//        }
//    }
//    //Get the updated Summary Section
//    summarySection(table.tableObj);
//}

////Under 
//function sortTable(e) {
//    var table, rows, switching, i, x, y, shouldSwitch;
//    var sortType = $(e).attr('data-sort');
//    var colIndex = $(e).attr('data-index');
//    if (sortType == "asc") {
//        $(e).attr('data-sort', "dsc");
//    }
//    else {
//        $(e).attr('data-sort', "asc");

//    }

//    table = $(e).closest('table')[0];
//    switching = true;
//    /*Make a loop that will continue until
//    no switching has been done:*/
//    while (switching) {
//        //start by saying: no switching is done:
//        switching = false;
//        rows = $(table).find('tr').not('tfoot tr');
//        /*Loop through all table rows (except the
//        first, which contains table headers):*/
//        for (i = 1; i < (rows.length - 1) ; i++) {
//            //start by saying there should be no switching:
//            shouldSwitch = false;
//            /*Get the two elements you want to compare,
//            one from current row and one from the next:*/
//            x = rows[i].getElementsByTagName("TD")[0];
//            y = rows[i + 1].getElementsByTagName("TD")[0];
//            //check if the two rows should switch place:
//            if (sortType == "asc") {
//                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                    //if so, mark as a switch and break the loop:
//                    shouldSwitch = true;
//                    break;
//                }
//            }
//            else {
//                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//                    //if so, mark as a switch and break the loop:
//                    shouldSwitch = true;
//                    break;
//                }
//            }
//        }
//        if (shouldSwitch) {
//            /*If a switch has been marked, make the switch
//            and mark that a switch has been done:*/
//            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//            switching = true;
//        }
//    }
//}


//function Reorder() {
//    var html = "", modalHtml = "";
//    $('.colHeader').each(function (i) {

//        //Column Header
//        var text = $(this).clone().find('div').remove().end().text();

//        var show = $(this).attr('data-show');
//        var colIndex = $(this).attr('data-index');


//        if (show == "true") {
//            //Check the checkbox in the column Header
//            if (i != 0) {
//                html = html + '<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" checked="checked" onchange="changeColHeader(this);"/> ' + text + ' </li>';
//                modalHtml = modalHtml + '<tr><td><input id="filterText" data-index="' + colIndex + '" type="checkbox" checked="checked" onchange="changeColHeader(this);""/> ' + text + ' </td></tr>';
//            }
//            //Show the column in Table

//            showColumn(colIndex)
//        }
//        else {
//            //Un Check the checkbox in the column Header
//            html = html + '<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" onchange="changeColHeader(this);""/> ' + text + ' </li>'
//            modalHtml = modalHtml + '<tr><td><input id="filterText" data-index="' + colIndex + '" type="checkbox" onchange="changeColHeader(this);""/> ' + text + ' </td></tr>';
//            //Hide the column in Table
//            hideColumn(colIndex);
//        }


//        $("#divColHeader .dropdown-menu").html(html);
//        $("#divColHeaderModal .col-menu").html(modalHtml);

//    });
//}

//function FilterAndSummary() {
//    $('table th').each(function () {
//        $('table tfoot tr').append('<td><span id="countFooterSummary" style="display:none;"></span><br /><span id="sumFooterSummary" style="display:none;"></span><br /><span id="minFooterSummary" style="display:none;"></span><br /><span id="maxFooterSummary" style="display:none;"></span></td>')

//        //Get Column Type of Column
//        var colType = $(this).attr('data-columnType');
//        //Get the column index
//        var colIndex = $(this).attr('data-index');

//        //For Text type disable mathematical operations
//        if (colType == "text") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);" disabled="disabled" /> Sum</li><li><input id="min" type="checkbox" name="min" disabled="disabled" data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max" disabled="disabled" type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');

//            $(this).append('<div data-html2canvas-ignore class="dropdown pull-right" id="filter"><button class="btn-xs btn-basic dropdown-toggle" type="button" data-toggle="dropdown"><span class="glyphicon glyphicon-filter"></span></button><ul class="dropdown-menu"><li><input class="glyphicon glyphicon-search" id="filterText" type="text" name="filter" data-index="' + colIndex + '" onkeyup="filterColumn(this);" /></li></ul></div>')
//        }
//            //For Number enable mathematical operations
//        else if (colType == "number") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);"  /> Sum</li><li><input id="min" type="checkbox" name="min"  data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max"  type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');
//        }


//    });
//}



var table = {
    tableId: "tblUser",
    tableObj: "table#tblUser",
    includeSummary: true,
    exportFileName: "User",
    currenyType: "JPY",
    currSymbol: function () {
        return currency_symbols[this.currenyType];
    }
};
var exportHtml = '<div class="export"><div class="exportDivContainer" style="padding-top:5px;display:none;"><div class="dropdown pull-right" id="exportDiv"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Export To<span class="caret"></span></button><ul class="dropdown-menu"></ul></div></div></div>';
var editPopupModalHtml = '<div class="modal fade" id="popUpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Edit User</h4></div><div class="modal-body">Under Construction</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
var colHeaderPopupModalHtml = '<div class="modal fade" id="divColHeaderModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document" style="width:20%;!important"> <div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Show/Hide Columns</h4></div><div class="modal-body"><table class="col-menu"></table></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
//var showPageSizeEntriesHtml = '<div  class="dataTables_length" id="' + table.tableId + '_length"><label>Show <select name="' + table.tableId + '_length" onchange="pageLengthChanged(this)"><option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div>';
var showPageSizeEntriesHtml = '<div  class="dataTables_length"><label>Show <select name="' + table.tableId + '_length" onchange="pageLengthChanged(this)"><option value="2">2</option><option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div>';


var isPdfExport = false;
var isCsvExport = false;
var pageSize = 20;
function stopSorting(event) {
    $('.toogle').dropdown();
    if (event != null && event != undefined)
        event.stopPropagation();                    //to stops sorting when clicking on summary.
}

function InitializeRowSelector (obj) {

    $(obj).find('tbody tr td.sno span').remove();                               //Remove span from .sno class for alignment issue.


    $(obj).find('tbody tr').on('click', function () {
        if ($(this).attr('grouped') == undefined) {                             //No need to apply selector for root level row.
            $('.selected').find('td:nth-child(1) span').remove();
            $('.selected').removeClass('selected');

            $(this).addClass('selected');

            $(this).find('td:nth-child(1)').find('span').remove();

            $(this).find('td:nth-child(1)').append('<span class="rowSelect glyphicon glyphicon-chevron-right" style="font-size: 0.8em;"></span>'); //Size 0.8em is set to have a reduced glyphicon size


        }
    });
}

(function ($) {

    $.initialize = function (option, obj) {

        table.tableObj = obj;

        if (option != null) {
            if (option.pdfExport != null)
                isPdfExport = option.pdfExport;
            if (option.csvExport != null)
                isCsvExport = option.csvExport;
        }

        ReadyFunction();
        if (option != null) {
            if (option.exportFileName != null)
                table.exportFileName = option.exportFileName;
            if (option.currenyType != null)
                table.currenyType = option.currenyType;
            if (option.pageSize != null)
                pageSize = option.pageSize;
            if (option.groupBy != null && option.groupBy)
                $(obj).initGroupBy({ "pageSize": option.pageSize });


        }

        //includeSummaryChange();

        //setTimeout(function () {
        //InitializeDataTable(obj, false);
        //}, 100);
    }
    $.fn.initCustom = function (option) {
        return this.each(function () {
            //table.tableObj = $(this);
            $.initialize(option, $(this));

        });
    }
    pageLengthChanged = function () {
        pageNo = 1;
        pageSize = parseInt($('.dataTables_length select').val());

        if ($('.groupByContainer .thparent').length > 0)          //table grouped by. Initialize custom paging
        {
            initializeCustomTable(table.tableObj);
        }
        else {
            InitializeDataTable(table.tableObj);
        }
        InitializeRowSelector(table.tableObj);
    }

    initializeCustomTable = function (obj) {
        //$('.dataTables_length').remove();

        $(obj).initCustomPaging({ "pageSize": pageSize });
    }
})(jQuery);


var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

function InitializeDataTable(tblObj, isDestroy) {
    ////DataTable should be added to prevent the darkening of alterate rows in PDF Export - Issue in PDF

    var html = $('<div class="temp">').append($('.exportDivContainer')).html();

    $('.export').html(html);
    $('.temp').remove();

    if (isDestroy == true) {                        //Used to destroy after grouped by.


        $(tblObj).dataTable().fnDestroy();

        $(".exportDivContainer").addClass('col-md-offset-3');
            
    }
    else {
        //Removing dataTables_length because it is copied and pasted in same location by custom paging.
      
        $(tblObj).dataTable({
            dom: 'Bfrtip',
            "destroy": true,
            "bdestroy": true,
            "bFilter": false, //Complete grid filter with textbox
            "sPaginationType": "full_numbers",
            //"bLengthChange": true,
            "iDisplayLength": pageSize, //Default number selected in dropdown
            //"aLengthMenu": [[1,2,5, 10, 50, -1], [1,2,5, 10, 50, "All"]], //To show how many records from the table
            //"bInfo": false, //Hide Showing n records of the total
            "bText": 'Export',
            //"aaSorting": [[5,'asc']],
            "aaSorting": [],
            //"aButtons": [
            //     {
            //         "sExtends": "csv",
            //         "sButtonText": "Download Excel"
            //     },
            //     {
            //         "sExtends": "pdf",
            //         "sButtonText": "Download PDF",
            //         "sPdfOrientation": "landscape"
            //     }
            //],
            "aoColumnDefs": [{ "bSortable": false, "aTargets": ["sorting_disabled"] }]
        });

        $(".dataTables_info").addClass('.col-md-3');


        if (!$(".exportDivContainer").hasClass('col-md-3'))
            $(".exportDivContainer").addClass('col-md-3');
        $(".exportDivContainer").removeClass('col-md-offset-3');
        $(".exportDivContainer").insertAfter(".dataTables_info");
        $(".exportDivContainer").show();


        $('.dataTables_length').insertBefore($('.groupByContainer'));

    }
    //alert('Datatable initialized');

    setTimeout(function () {                //Here setting time out, because at first time events are not binding properly.
        InitializeExport();
    }, 1000);
}

function InitializeExport() {
    $("#pdfExport").unbind("click");
    $("#csvExport").unbind("click");
    $("#pdfExport").click(function () {
        summarySection(table.tableObj); //If not included, it will not load summary section when column is not clicked even once, as the value will not be computed at that instant
        var tableName = $("#pdfExport").attr('data-tableName');
        var fileName = $("#pdfExport").attr('data-fileName');
        exportPdf(tableName);
    });

    //CSV export button click event
    $("#csvExport").on('click', function (event) {
        summarySection(table.tableObj); //If not included, it will not load summary section when column is not clicked even once, as the value will not be computed at that instant
        var tableName = $("#csvExport").attr('data-tableName'); //Gets the tableName from ExportGrid function call
        var fileName = $("#csvExport").attr('data-fileName');   //Gets the fileName from ExportGrid function call
        var args = [$('#' + tableName)];
        exportTableToCSV.apply(this, args);
    });
}

function ReadyFunction() {
    $(exportHtml).appendTo('body');
    $(editPopupModalHtml).appendTo('body');
    $(colHeaderPopupModalHtml).appendTo('body');


    //1st Param = Export to PDF, 2nd Param = Export to CSV , 3rd Param = TableName , 4th Param = FileName
    ExportGrid(isPdfExport, isCsvExport, table.tableId, table.exportFileName);

    //PDF export button click event


    //Iterate through all columns with currency class and add the currency symbol.
    $(".currency").each(function () {
        var thIndex = $(this).index() + 1;
        var currencySymbol = table.currSymbol();
        $(table.tableObj).find(" td:nth-child(" + thIndex + ")").not('tfoot td').each(function () {
            var text = this.innerText;
            if (text != undefined && text != "") {
                var currency = currencyFormat(text, currencySymbol);
                this.innerText = currency;
            }
        });
    });

    //$('table th').each(function () {
    $(table.tableObj).find('thead th').each(function () {
        //$('table tfoot tr').append('<td><span id="countFooterSummary" style="display:none;"></span><br /><span id="sumFooterSummary" style="display:none;"></span><br /><span id="minFooterSummary" style="display:none;"></span><br /><span id="maxFooterSummary" style="display:none;"></span><br /><span id="averageSummary" style="display:none;"></span></td>')
        $(table.tableObj).find('tfoot tr').append('<td><span id="countFooterSummary" style="display:none;"></span><br /><span id="sumFooterSummary" style="display:none;"></span><br /><span id="minFooterSummary" style="display:none;"></span><br /><span id="maxFooterSummary" style="display:none;"></span><br /><span id="averageSummary" style="display:none;"></span></td>')

        //Get Column Type of Column
        var colType = $(this).attr('data-columnType');
        //Get the column index
        var colIndex = $(this).attr('data-index');

        //Get If Column is filterable
        var colFilter = $(this).attr('data-filterable');

        //For Text type disable mathematical operations
        if (colType == "text") {
            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right summaryContainer" id="totalSummary" ><span class="dropdown-toggle toogle"  data-toggle="dropdown" onclick="stopSorting(event)"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);" disabled="disabled" /> Sum</li><li><input id="min" type="checkbox" name="min" disabled="disabled" data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max" disabled="disabled" type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');
        }

            //For Number enable mathematical operations
        else if (colType == "number") {
            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right summaryContainer" id="totalSummary"><span class="dropdown-toggle toogle"  data-toggle="dropdown"  onclick="stopSorting(event)"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);"  /> Sum</li><li><input id="min" type="checkbox" name="min"  data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max"  type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li><li><input id="average" type="checkbox" name="average" data-summaryType="average" data-index="' + colIndex + '" onchange="CalculateAverage(this);" /> Average</li></ul></div>');
        }

        //$('#totalSummary').onClick(function () {
        //    alert();
        //});
        //Set Column Filter Icon
        if (colFilter == "true") {
            $(this).append('<div data-html2canvas-ignore class="dropdown pull-right filterContainer" id="filter" ><button class="btn-xs btn-basic dropdown-toggle toogle" type="button" data-toggle="dropdown" onclick="stopSorting(event)"><span class="glyphicon glyphicon-filter"></span></button><ul class="dropdown-menu"><li><input class="glyphicon glyphicon-search" id="filterText" type="text" name="filter" data-index="' + colIndex + '" onkeyup="filterColumn(this);" /></li></ul></div>')
        }


        //stopSorting();  //Calling this function. Toogle dropdown is working when clicked for second time. so it will invoke the dropdown once.


    });


    //Add Selected row CSS
    //$('#tblUser tbody tr').on('click', function () {
    //    $(this).closest("tr").siblings().removeClass("selected"); //To remove any existing selected row css
    //    $(this).closest("tr").siblings().find('td:nth-child(1) span').remove(); // Remove glyphicon for the selected row

    //    $(this).addClass('selected'); // Add selected row CSS
    //    //Check if span tag is already present
    //    if ($('.rowSelect').length) {
    //        $(this).closest("tr").siblings().find('td:nth-child(1) span').remove();
    //    }
    //    else {
    //        $($(this).find('td:nth-child(1)')[0]).append('<span class="rowSelect glyphicon glyphicon-chevron-right" style="font-size: 0.8em;"></span>'); //Size 0.8em is set to have a reduced glyphicon size
    //    }
    //});


    //$('#tblUser tbody tr').on('dblclick', function () {
    //    $('#popUpModal').modal('show');
    //});
    $(table.tableObj).find('tbody tr').on('dblclick', function () {
        //$('#tblUser tbody tr').on('dblclick', function () {
        $('#popUpModal').modal('show');
    });

    //Show/Hide Column and set the column header functionality
    Reorder();


    //$('#totalSummary').click(function () {
    //    return false;
    //});
    //console.log($(table.tableObj).html());

    $(showPageSizeEntriesHtml).insertBefore($(table.tableObj));


}
//$(document).ready(function () {
//    //ReadyFunction();
//})

//Added Gokul. Old calculation for sum, count is not understanding for me. So Added this method for Calculating for Average.
function CalculateAverage(obj, event) {                                   //Instead of handleChange() method created this for summary.
    var index = GetIndex($(obj).closest('th'));
    index;
    if ($(obj).prop('checked')) {

        var count = 0;
        var sum = parseFloat(0);
        $(table.tableObj).find('tbody tr:visible').each(function (i) {
            var tdObj = $(this).find('td:eq(' + index + ')');
            var ele = $(tdObj).html();
            if (ele != undefined) {
                var colValue = $(tdObj).html().replace(currencySymbol, "").replace(/,/g, ""); //Replace currency and comma for cuurency columns
                if (colValue != '' && colValue != undefined) {
                    sum = sum + parseFloat(colValue);
                    count++;
                }
            }
        });

        var average = sum / count;
        if (average % 1 != 0)         //If decimal, then limit decimal places to 2.   
            average = average.toFixed(2);

        if (!isNaN(average))
            $(table.tableObj).find('tfoot tr td:eq(' + index + ') #averageSummary').html("Average :" + average).show();
    }
    else {
        $(table.tableObj).find('tfoot tr td:eq(' + index + ') #averageSummary').hide();
    }
}

//Include/Exclude Summary section in table export
var includeSummaryChange = function (e) {
    if (e.checked) {
        table.includeSummary = true;
    }
    else {
        table.includeSummary = false;
    }
}


var ExportGrid = function (pdf, csv, tableName, fileName) {
    exportToPdf = pdf;
    exportToCsv = csv;
    fileName = fileName;
    //alert(exportToPdf);
    if (exportToPdf) {
        $("#exportDiv .dropdown-menu").append("<li  class='export'><a id='pdfExport' href='#' data-fileName=" + fileName + " data-tableName=" + tableName + ">PDF</a></li>")
    }

    if (exportToCsv) {
        $("#exportDiv .dropdown-menu").append("<li ><a id='csvExport' href='#'  data-fileName=" + fileName + " data-tableName=" + tableName + ">CSV</a></li>")

    }
    if (!exportToCsv && !exportToPdf) {
        $("#exportDiv").hide();
    }
}

//PDF with AutoTable Plugin
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.0/jspdf.plugin.autotable.js"></script>
var exportPdf = function (tableName) {
    var doc = new jsPDF('p', 'pt', 'letter', true);
    //var tableObj = $('#' + tableName);
    var tableObj = table.tableObj;

    //var tempTbl = $('<div class="temp">').append($('#' + tableName).clone()).html();

    //var tempTbl = $('<div class="temp">').append($('#' + tableName)).html();

    //console.log($(tempTbl).html());

    $table = $(tableObj).clone();

    $table.find('.pageHidden').remove();

    //console.log($table.find('tbody').html());

    if (!table.includeSummary) {
        //if not cloned main table total summary will be removed
        $table.find("#summary").remove();
        $table.find("#totalSummary").remove(); //Remove Summary row if present in the Grid
    }

    //Remove first column
    //$table.find('tr th:nth-child(1), tr td:nth-child(1)').remove();
    $table.find('tr th:nth-child(1), tbody tr td.sno, tfoot tr td:nth-child(1)').remove();          //checking for .sno class because if grouped then grouped column is in first position
    //$table.find('tfoot tr td span:hidden').remove();
    var res = doc.autoTableHtmlToJson($table[0]);

    //Added columns explicitly, Includes span text elements if not included.
    var cols = [];
    $.each(res.columns, function (key, data) {
        cols.push($(data).find('div').remove().end().text());
    })



    doc.autoTable(cols, res.data, {
        styles: {
            overflow: 'linebreak',
            columnWidth: 'auto' //Column Width will vary as per the cell value
        }
    });
    doc.save(table.exportFileName + ".pdf");
}


//Export to CSV related Functions
function exportTableToCSV($table) {
    $table = $table.clone(); //if not cloned main table total summary will be removed
    $table.find("#totalSummary").remove(); //Remove Summary row if present in the Grid

    $table.find('.pageHidden').remove();

    //$table.find('tr th:nth-child(1), tr td:nth-child(1)').remove();
    $table.find('tr th:nth-child(1), tbody tr td.sno, tfoot tr td:nth-child(1)').remove();          //checking for .sno class because if grouped then grouped column is in first position
    if (!table.includeSummary) {
        $table.find("#summary").remove();
    }
    else {
        $table1 = $table.clone();
        $table1.find("#summary").remove();
        $table1.find('tbody').append($table.find('tfoot'));

        $table = $table1;
    }

    var $rows = $table.find('tr'),
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      csv = '"' + $rows.map(function (i, row) {
          var $row = $(row),
            $cols = $row.find('th,td'); //td and th elements to be exported

          return $cols.map(function (j, col) {
              var $col = $(col),
                text = $col.text();
              return text.replace(/"/g, '""');

          }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    if (false && window.navigator.msSaveBlob) {

        var blob = new Blob([decodeURIComponent(csv)], {
            type: 'text/csv;charset=utf8'
        });

        window.navigator.msSaveBlob(blob, table.exportFileName + '.csv');

    } else if (window.Blob && window.URL) {
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8'
        });
        var csvUrl = URL.createObjectURL(blob);

        $(this)
          .attr({
              'download': table.exportFileName + '.csv',
              'href': csvUrl
          });
    } else {
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
          .attr({
              'download': table.exportFileName + '.csv',
              'href': csvData,
              'target': '_blank'
          });
    }
}

//Summary Section Begins
//Iterate through each column and row to get the count, min, max and sum values column wise
function summarySection(tblObj) {
    var currencySymbol = table.currSymbol();
    var result = [], count = [], min = {}, max = {}; //Variables used in Summary Section
    //Iterate through each column and row to get the count, min, max and sum values column wise
    $(tblObj).find('tr:visible').not('thead tr').not('tfoot tr').each(function () {
        //console.log("tr invoking");
        $('td', this).each(function (index, val) {
            //console.log("index  =" + index);

            //var curIndex = index + 1;
            if ($(val).text() != "") {
                count[index] = count[index] == undefined ? 1 : count[index] + 1;
            }

            //console.log(index);

            //Check if the column is number or empty
            //If the column is of number type
            if ($($(tblObj).find("th")[index]).attr('data-columntype') == "number") {
                if ($(val).text() != "") {
                    var colValue = $(val).text().replace(currencySymbol, "").replace(/,/g, ""); //Replace currency and comma for cuurency columns
                    if (!result[index]) {
                        result[index] = 0; //If no value is present, set 0 by default
                    }

                    result[index] += parseFloat(colValue);

                    //Compute Minimum - Add current td element to Min array
                    if (!min[index])
                        min[index] = [];
                    min[index].push(parseFloat(colValue));

                    //Compute Maximum - Add current td element to Max array
                    if (!max[index])
                        max[index] = [];
                    max[index].push(parseFloat(colValue));
                }
            }
            else {
            }
        });
    });

    $(count).each(function (index) {
        //Get Column min value
        if (min[index] != undefined) {
            var minCol = Math.min.apply(0, min[index]);
        }

        //Get Column max value
        if (max[index] != undefined) {
            var maxCol = Math.max.apply(0, max[index]);
        }

        //If the column is of number type
        if ($($(tblObj).find("th")[index]).attr('data-columntype') == "number") {
            if (result[index] != undefined) {
                if ($($(tblObj).find("th")[index]).hasClass('currency')) {
                    setSummaryValue(index, count[index], result[index], minCol, maxCol, true);
                }
                else {
                    setSummaryValue(index, count[index], result[index], minCol, maxCol, false);
                }
            }
            else {
                setSummaryValue(index, 0, 0, 0, 0, false);
            }
        }

            //If the column is of text type
        else if ($($(tblObj).find('th')[index]).attr('data-columntype') == "text") {
            $(tblObj).find('tr').find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count[index]);
        }
    });

    if (count == undefined || count == 0) {
        $(tblObj).find('tfoot tr td').each(function (index) {
            if ($($(tblObj).find('th')[index]).attr('data-columntype') == "number") {
                if (result[index] != undefined) {
                    setSummaryValue(index, 0, 0, 0, 0, false);
                }
                else {
                    setSummaryValue(index, 0, 0, 0, 0, false);
                }
            }
            else {
                $(tblObj).find('tr').find('td:eq(' + index + ') #countFooterSummary').text(' Count: 0 ');
            }
        });
    }
    //console.log(result);
}

var currencySymbol = table.currSymbol();

//Set the summary section value
function setSummaryValue(index, count, sum, min, max, hasCurrency) {
    //console.log("index   =" + index + "  sum   =" + sum);
    if (hasCurrency) {
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #sumFooterSummary').text(' Sum: ' + currencySymbol + sum);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #minFooterSummary').text(' Minimum: ' + currencySymbol + min);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #maxFooterSummary').text(' Maximum: ' + currencySymbol + max);
    }
    else {
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #countFooterSummary').text(' Count: ' + count);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #sumFooterSummary').text(' Sum: ' + sum);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #minFooterSummary').text(' Minimum: ' + min);
        $(table.tableObj).find("tr").find('td:eq(' + index + ') #maxFooterSummary').text(' Maximum: ' + max);
    }

}
//Summary Section Ends

//Column Header event
function colHeaderEvent(e) {
    $("#divColHeaderModal").modal('show');
    //$("#divColHeader").toggleClass("open");
    //$("div#divColHeader span").attr("aria-expanded","true");
    e.stopPropagation();
}

//Change event of Grid Column Header
function changeColHeader(e) {
    //var name = $(e).val();

    var dataIndex = $(e).attr('data-index'); //Get the current Column Index

    var currIndex = GetIndexByDataIndex(dataIndex);

    //console.log("dataIndex  =" + dataIndex + "  currIndex   =" + currIndex);

    //console.log("Show/Hide  =" + currIndex);
    //Checked event to show column
    if (e.checked) {
        showColumn(currIndex, true)
    }
        //UnChecked event to hide column
    else {
        hideColumn(currIndex);
    }
}

//Hide Table Column
function hideColumn(index) {
    //var index = parseInt(temp) + 1;
    index++;

    $(table.tableObj).find("td:nth-child(" + index + ")").hide(); //Hide all td in the column
    $(table.tableObj).find("th:nth-child(" + index + ")").hide(); //Hide the header for the corresponding column
    ResetIndex(); //If Index is not reset, summary section will be affected
}

//Show Table Column
function showColumn(index, resetGroupBy) {
    index++;
    $(table.tableObj).find("td:nth-child(" + index + ")").show(); //Show all td in the column
    $(table.tableObj).find("th:nth-child(" + index + ")").show(); //Show the header for the corresponding column
    ResetIndex(); //If Index is not reset, summary section will be affected

    //if (resetGroupBy == true)        //Checking, because for the first time this ShowColumn method is calling repeteatly for each and every column. So reset GroupBy only check box changed.
    //    InitializeGroupBy();
}

//Reset Column Index
function ResetIndex() {
    $(table.tableObj).find("thead th").each(function (index) {
        //$(this).attr("data-index", index);
    });
}
function GetIndex(thObj) {

    //var colIndex = $(e).closest('th').attr('data-index'); //Gets column Index

    //if ($('.groupByContainer .thparent').length > 0)          //table grouped by. So take the grpIndex instead of data-index.
    //{
    //    colIndex = $(e).closest('th').attr('grpIndex');
    //}
    //return colIndex;


    var colIndex = $(thObj).attr('data-index'); //Gets column Index
    //console.log($(e).attr('grpindex'));
    if ($('.groupByContainer .thparent').length > 0)          //table grouped by. So take the grpIndex instead of data-index.
    {
        colIndex = $(thObj).attr('grpindex');
    }
    return colIndex;
}

function GetIndexByDataIndex(dataIndex) {
    var thObj = $(table.tableObj).find('th[data-index="' + dataIndex + '"]');
    return GetIndex(thObj);
}



//Checkbox checked/unchecked event
function handleChange(e) {
    //Get the updated Summary Section
    summarySection(table.tableObj);
    //var colIndex = $(e).closest('th').attr('index'); //Gets column Index

    //var parentth = $(e).closest('th');
    //var indexPos = $(e).parent('tr').children().index(parentth);
    ////console.log(indexPos);

    //var colIndex = $(e).closest('th').attr('data-index'); //Gets column Index

    //if ($('.groupByContainer .thparent').length > 0)          //table grouped by. So take the grpIndex instead of data-index.
    //{
    //    colIndex = $(e).closest('th').attr('grpIndex');
    //}

    var colIndex = GetIndex($(e).closest('th'));
    var summaryType = $(e).attr('data-summaryType'); //Gets the summary type to be displayed
    if (e.checked) {
        showSummary(colIndex, summaryType);
    }
        //UnChecked event to hide the summary details
    else {
        hideSummary(colIndex, summaryType);
    }
}

//Show Summary section for the corresponding column and for the corresponding type
function showSummary(colIndex, summaryType) {
    //colIndex++;
    ////console.log("colIndex  =" + colIndex);
    if (summaryType == "count")
        $('tfoot').find('td:eq(' + colIndex + ') #countFooterSummary').removeAttr('style');
    else if (summaryType == "sum")
        $('tfoot').find('td:eq(' + colIndex + ') #sumFooterSummary').removeAttr('style');
    else if (summaryType == "min")
        $('tfoot').find('td:eq(' + colIndex + ') #minFooterSummary').removeAttr('style');
    else if (summaryType == "max")
        $('tfoot').find('td:eq(' + colIndex + ') #maxFooterSummary').removeAttr('style');
}

//Hide Summary section for the corresponding column and for the corresponding type
function hideSummary(colIndex, summaryType) {
    //$(table.tableObj).find("tfoot tr td:hidden").remove();
    if (summaryType == "count")
        $('tfoot').find('td:eq(' + colIndex + ') #countFooterSummary').attr('style', 'display:none');
    else if (summaryType == "sum")
        $('tfoot').find('td:eq(' + colIndex + ') #sumFooterSummary').attr('style', 'display:none');
    else if (summaryType == "min")
        $('tfoot').find('td:eq(' + colIndex + ') #minFooterSummary').attr('style', 'display:none');
    else if (summaryType == "max")
        $('tfoot').find('td:eq(' + colIndex + ') #maxFooterSummary').attr('style', 'display:none');
}

//Curreny Format
function currencyFormat(n, currency) {
    return currency + "" + n.replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
}


//Individual Column Filter
function filterColumn(e) {
    var colIndex = $(e).attr('data-index'); //Gets column Index
    var filter, closestTable, tr, td, i;
    filter = e.value.toUpperCase();
    closestTable = $(e).closest('table')[0];
    //console.log(filter);
    tr = $(closestTable).find('tr').not('thead tr').not('tfoot tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[colIndex];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    //Get the updated Summary Section
    summarySection(table.tableObj);
}

//Under 
function sortTable(e) {
    var table, rows, switching, i, x, y, shouldSwitch;
    var sortType = $(e).attr('data-sort');
    var colIndex = $(e).attr('data-index');
    if (sortType == "asc") {
        $(e).attr('data-sort', "dsc");
    }
    else {
        $(e).attr('data-sort', "asc");
    }

    table = $(e).closest('table')[0];
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = $(table).find('tr').not('tfoot tr');
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1) ; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (sortType == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function Reorder() {
    var html = "", modalHtml = "";
    $('.colHeader').each(function (i) {

        //Column Header
        var text = $(this).clone().find('div').remove().end().text();

        var show = $(this).attr('data-show');
        var colIndex = $(this).attr('data-index');


        if (show == "true") {
            //Check the checkbox in the column Header
            if (i != 0) {
                html = html + '<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" checked="checked" onchange="changeColHeader(this);"/> ' + text + ' </li>';
                modalHtml = modalHtml + '<tr><td><input id="filterText" data-index="' + colIndex + '" type="checkbox" checked="checked" onchange="changeColHeader(this);""/> ' + text + ' </td></tr>';
            }
            //Show the column in Table

            showColumn(colIndex)
        }
        else {
            //Un Check the checkbox in the column Header
            html = html + '<li><input id="filterText" data-index="' + colIndex + '" type="checkbox" onchange="changeColHeader(this);""/> ' + text + ' </li>'
            modalHtml = modalHtml + '<tr><td><input id="filterText" data-index="' + colIndex + '" type="checkbox" onchange="changeColHeader(this);""/> ' + text + ' </td></tr>';
            //Hide the column in Table
            hideColumn(colIndex);
        }

        $("#divColHeader .dropdown-menu").html(html);
        $("#divColHeaderModal .col-menu").html(modalHtml);

    });
}

function ReSetShowHideColumns() {                                       //This function is calling from groupby. If all columns were removed from group by then need to hide columns.
    $('table.col-menu').find('input[type="checkbox"]').each(function () {
        var colIndex = $(this).attr('data-index'); //Get the current Column Index
        //var checkeds = $(this).prop('checked');
        ////console.log(checkeds);
        if ($(this).prop('checked')) {
            showColumn(colIndex, false);
        }
            //UnChecked event to hide column
        else {
            //console.log("colIndex  =" + colIndex);
            hideColumn(colIndex);
        }
    });
}

//function FilterAndSummary() {
//    $('table th').each(function () {
//        $('table tfoot tr').append('<td><span id="countFooterSummary" style="display:none;"></span><br /><span id="sumFooterSummary" style="display:none;"></span><br /><span id="minFooterSummary" style="display:none;"></span><br /><span id="maxFooterSummary" style="display:none;"><br/></span><span id="averageSummary" style="display:none;"></span></td>')

//        //Get Column Type of Column
//        var colType = $(this).attr('data-columnType');
//        //Get the column index
//        var colIndex = $(this).attr('data-index');

//        //For Text type disable mathematical operations
//        if (colType == "text") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right filter" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);" disabled="disabled" /> Sum</li><li><input id="min" type="checkbox" name="min" disabled="disabled" data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max" disabled="disabled" type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');

//            $(this).append('<div data-html2canvas-ignore class="dropdown pull-right  filter" id="filter"><button class="btn-xs btn-basic dropdown-toggle" type="button" data-toggle="dropdown"><span class="glyphicon glyphicon-filter"></span></button><ul class="dropdown-menu"><li><input class="glyphicon glyphicon-search" id="filterText" type="text" name="filter" data-index="' + colIndex + '" onkeyup="filterColumn(this);" /></li></ul></div>')
//        }
//            //For Number enable mathematical operations
//        else if (colType == "number") {
//            $(this).append('<div  data-html2canvas-ignore class="dropdown pull-right  filter" id="totalSummary"><span class="dropdown-toggle"  data-toggle="dropdown"><img height="10" width="10"  src="/images/Greek_uc_sigma.svg" /></span><ul class="dropdown-menu"><li><input id="count" type="checkbox" name="count" data-summaryType="count" data-index="' + colIndex + '" onchange="handleChange(this);" /> Count</li><li><input id="sum" type="checkbox" name="sum" data-summaryType="sum" data-index="' + colIndex + '" onchange="handleChange(this);"  /> Sum</li><li><input id="min" type="checkbox" name="min"  data-summaryType="min" data-index="' + colIndex + '" onchange="handleChange(this);" /> Min</li><li><input id="max"  type="checkbox" name="max" data-summaryType="max" data-index="' + colIndex + '" onchange="handleChange(this);" /> Max</li></ul></div>');
//        }
//    });
//}


