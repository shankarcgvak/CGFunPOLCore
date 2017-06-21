// jQuery Plugin Groupby 

(function ($) {
    var tblObj;

    var cloneTableObj;

    var groupedCols = [];

    var debug = false;

    //var dropHtml = '<div id="drop" class="fbox container" style="padding:10px;"><div class="alert alert-info fade in alert-dismissable empty"><strong>Info!</strong> Drag columns here to group by</div></div>';
    //var dropHtml = '<div id="drop" class="fbox"><div class="alert alert-info fade in alert-dismissable empty"><strong>Info!</strong> Drag columns here to group by</div></div>';
    var dropHtml = '<div id="drop" class="alert-success"><div class="alert alert-info fade in alert-dismissable empty"><strong>Info!</strong> Drag columns here to group by</div></div>';
    var clearHtml = '<div class="clear" style="clear:both;"></div>';
    $.initGroupBy = function (element, options) {

        $.InitDraggable();

        //var defaults = {
        //    foo: 'bar',
        //    onFoo: function () { }
        //}


        //plugin.settings = {}

        //var $element = $(element),
        //     element = element;

        //plugin.init = function () {
        //    plugin.settings = $.extend({}, defaults, options);
        //    // code goes here
        //}

        //plugin.foo_public_method = function () {
        //    // code goes here
        //}

        //var foo_private_method = function () {
        //    // code goes here
        //}

        //plugin.init();

    }

    $.InitDraggable = function () {
        //$j12 = jQuery.noConflict();
        //$(".draggable").draggable({ cursor: "crosshair", revert: "invalid" });
        tblObj.find(".draggable").draggable({ revert: "invalid" });
        $("#drop").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                $(this).removeClass("border").removeClass("over");
                var dropped = ui.draggable;
                debugger;
                var droppedOn = $(this);
                dropped=$(dropped).remove('#totalSummary');
                var droppedContent = dropped.html();

                //console.log(droppedContent);

                $(dropped).detach();//.css({ top: 0, left: 0 }).appendTo(droppedOn);

                var index = $(dropped).attr('index');
                var name = $(dropped).attr('name');
                $(dropped).find("#totalSummary").hide();
                var outerHtml = $.GetOuterHtml(dropped);
                outerHtml = outerHtml + '';
                droppedOn.find('.clear').remove();
                //var html = '<div  class="thparent col-sm-2 alert alert-info fade in alert-dismissable" index="' + index + '" name="' + name + '"><a href="#" onclick="ReArrangeGroupBy(this)" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
                var html = '<div  class="thparent col-sm-2 alert alert-info fade in alert-dismissable" index="' + index + '" name="' + name + '"><a href="#" onclick="ReArrangeGroupBy(this)" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
                html = html + "<span class='content'>" + droppedContent + "</span></div>";
                html = html + clearHtml;
                
                droppedOn.find('.empty').remove();

                droppedOn.append(html);

                var colName = dropped.attr('name');

                var index = dropped.attr('index');

                groupedCols.push(colName);

                $.GroupBy();
                $.tableStruct();
            },
            over: function (event, elem) {
                $(this).addClass("over");
            },
            out: function (event, elem) {
                $(this).removeClass("over");
            }
        });
        $("#drop").sortable();
        $("#origin").sortable();
        
    }

    //$.RemoveColumnAtIndex = function (index) {
    //    tblObj.find("tr td:nth-child(" + index + ")").remove();
    //    $.ResetIndex(tblObj);
    //}

    $.ResetIndex = function (obj) {
        obj.find("tr th").each(function (runningIndex) {
            $(this).attr("index", runningIndex+1);
        });
    }

    ReArrangeGroupBy = function (obj) {                                               //calling from html.
       
        var parent = $(obj).parent(".thparent");
        var colName = parent.attr("name");

        var index = groupedCols.indexOf(colName);

        groupedCols.splice(index, 1);

        if (groupedCols.length <= 0) {
            $("#drop").html(' <div class="alert alert-info fade in alert-dismissable empty"><strong>Info!</strong> Drag columns here to group by</div>');
        }

        objAddTtTbl = $(obj).parent('.thparent');

        objAddTtTbl.find('div').remove();

        var indexToInsert = objAddTtTbl.attr('index');
        var nameToInsert= objAddTtTbl.attr('name');
        var content = objAddTtTbl.find('.content').html();
        //var html = $.GetOuterHtml(objAddTtTbl);
        var html = "<th index='" + indexToInsert + "' name='" + nameToInsert + "' class='draggable canReorder'>" + content + "</th>";;

        var lastth = tblObj.find("tr th:last-child").attr("index");

        if (indexToInsert > lastth)
            $(html).insertAfter(tblObj.find("tr th:last-child"));
        else {
            tblObj.find('tr th').each(function (runningIndex) {
                prevthObj = this;
                var currIndex = $(this).attr('index');
                if (currIndex > indexToInsert) {
                    $(html).insertBefore(tblObj.find('th[index="' + currIndex + '"]'));
                    return false;
                }
            });

            
        }

        $.GroupBy();
        FilterAndSummary();
        Reorder();
        
        $(tblObj).find(".draggable").draggable({ revert: "invalid" });
    }

    $.GroupBy = function () {
        if (groupedCols.length > 0) {
            var groupedBy = [];

            var groupCloneTableObj = cloneTableObj.clone().hide();
            
            groupCloneTableObj.find('tr td:nth-child(1)').addClass('Sno');//.each(function () {
            
            var treeHtml = '';

            treeHtml = $.GetGroupbyHtml(groupedCols, groupCloneTableObj);

            tblObj.find("tbody").html(treeHtml);

            tblObj.treegrid({ "collapseAll": true });
            
        }
        else {
            tblObj.html(cloneTableObj.html());
        }
    }

    $.GetGroupbyHtml = function (groupedCols, groupCloneTableObj) {
        console.log(groupCloneTableObj)
        var treeHtml = '';
        var rowValues = [];

        var testIndex = 0;
        $(groupedCols).each(function (index, currColName) {
            treeHtml = '';
            testIndex++;
            $.ResetIndex(groupCloneTableObj);

            var reset = 1;

            nodeIndex = 0;
            var groupedTableObj = $(groupCloneTableObj).clone().hide();                //Each and every cols table gets modified. groupedTableObj holds the updated table.

            var colIndex = $.GetObjColIndexByName(groupCloneTableObj, currColName);

            groupCloneTableObj.find("tr td:nth-child(" + colIndex + ")").each(function (index, column) {

                var contentToGroupBy = $(this).html();
                var check = rowValues.indexOf(contentToGroupBy);

                if (check < 0)
                    rowValues.push(contentToGroupBy);
            });

            groupCloneTableObj.find("tr th:nth-child(" + colIndex + ")").remove();
            groupCloneTableObj.find("tr td:nth-child(" + colIndex + ")").remove();

            $.ResetIndex(groupCloneTableObj);

            if (groupCloneTableObj.find('tr[grouped="true"]').length <= 0) {                 //Initial group by. No rows were grouped
                var parentIndex = 0;

                $(rowValues).each(function (rowIndex, currRunningVal) {

                    var currRunningIndexTree = 1;

                    var colsCount = tblObj.find("th").length;

                    treeHtml = treeHtml + "<tr class='rootparent treegrid-" + ++nodeIndex + "' position='" + nodeIndex + "' grouped='true' ><td colspan=" + colsCount + " grouped='true' >" + currColName + ": " + currRunningVal + "</td></tr>";
                    parentIndex = nodeIndex;

                    var sno = 1;
                    groupedTableObj.find("tr").each(function () {
                        if ($(this).find("td").length > 0) {

                            var curObj = $(this).find("td:nth-child(" + $.GetObjColIndexByName(groupedTableObj, currColName) + ")");
                            if (curObj != undefined && curObj.html() != undefined) {
                                if (curObj.html() == currRunningVal) {
                                    var i = 0;
                                    var parenttr = groupCloneTableObj.find("tr:nth-child(" + currRunningIndexTree + ")");
                                    treeHtml = treeHtml + "<tr class='treegrid-" + (++nodeIndex) + " treegrid-parent-" + parentIndex + "' position='" + nodeIndex + "' parentposition='" + parentIndex + "'><td class='sno'>" + sno++ + "</td>";
                                    $(parenttr).find("td").each(function () {
                                        if (!$(this).hasClass('Sno'))
                                            treeHtml = treeHtml + "<td>" + $(this).html() + "</td>";
                                    });
                                    treeHtml = treeHtml + "</tr>";
                                }
                                currRunningIndexTree++;
                            }

                        }
                    });

                });

                rowValues = [];
            }

            else {
                if (testIndex == 3)
                    debug = true;
                else
                    debug = false;

                groupedTableObj.find("tr td.sno").remove();   //Removing td with sno class.
                groupedTableObj.find("tr th.sno").remove();   //Removing th with sno class.

                ///////////////////////Newly added
                var rowHtml = '';

                $(groupedTableObj).find(".rootparent").each(function () {

                    var colSpan = tblObj.find("th").length;

                    var oldParentIndex = $(this).attr('position');

                    var newParentIndex = nodeIndex;

                    treeHtml = treeHtml + "<tr class='rootparent treegrid-" + ++nodeIndex + "' position='" + nodeIndex + "' grouped='true'><td colspan=" + colSpan + " grouped='true' >" + $(this).find('td').html() + "</td></tr>";

                    ////groupCloneTableObj.find('td.sno').remove();

                    treeHtml = treeHtml + $.getChildrenGroupHtml(groupedTableObj, oldParentIndex, colSpan, currColName);
                });
            }

            groupCloneTableObj.find("tbody").html(treeHtml);
        });

        return treeHtml;
    }

    $.getChildrenGroupHtml = function (currTblObj, oldParentIndex, colSpan, colToGroup) {
        var newParentPosition = nodeIndex;

        $.ResetIndex(currTblObj);
        var html = '';

        var colIndex = $.GetObjColIndexByName(currTblObj, colToGroup);

        var distinctRows = [];

        $(currTblObj).find("tr[parentposition='" + oldParentIndex + "']  td:nth-child(" + colIndex + ")").each(function () {
            var contentToGroupBy = $(this).html();
            var check = distinctRows.indexOf(contentToGroupBy);
            if (check < 0)
                distinctRows.push(contentToGroupBy);
        });


        var processedChildrens = false;
        $(currTblObj).find(".treegrid-parent-" + oldParentIndex).each(function () {
            var currObj = this;

            var isGrouped = $(this).attr('grouped');
            if (isGrouped != undefined) {                       //Grouped.
                html = html + "<tr class='treegrid-" + ++nodeIndex + " treegrid-parent-" + newParentPosition + " ' position='" + nodeIndex + "' grouped='true'><td colspan=" + colSpan + " grouped='true' >" + $(this).find('td').html() + "</td></tr>";
                var opIndex = $(this).attr('position');
                html = html + $.getChildrenGroupHtml(currTblObj, opIndex, colSpan, colToGroup);
            }
            else if (!processedChildrens) {
                processedChildrens = true;
                $(distinctRows).each(function (rowValuesArrIndex, groupByVal) {
                    //console.log(groupByVal);
                    var sno = 1;

                    html = html + "<tr class='treegrid-" + ++nodeIndex + " treegrid-parent-" + newParentPosition + "' parentposition=" + newParentPosition + " position='" + nodeIndex + "' grouped='true'><td colspan=" + colSpan + " grouped='true' >" + colToGroup + ": " + groupByVal + "</td></tr>";
                    var curParent = nodeIndex;

                    $(currTblObj).find(".treegrid-parent-" + oldParentIndex).each(function () {

                        if ($(this).find("td:nth-child(" + colIndex + ")").html() == groupByVal) {

                            if ($(this).find("td").length > 1)      //If 1 then it is the last column. so no child.           
                                html = html + "<tr class='treegrid-" + (++nodeIndex) + " treegrid-parent-" + curParent + "' position='" + nodeIndex + "' parentposition='" + curParent + "'><td class='sno'>" + sno++ + "</td>";

                            var tdIndex = 1;
                            $(this).find("td").each(function () {
                                if (colIndex != tdIndex) {
                                    //if (!$(currObj).hasClass('sno')) {
                                    html = html + "<td>" + $(this).html() + "</td>";
                                }
                                tdIndex++;
                            });
                            html = html + "</tr>";
                        }



                    });


                });
            }
        });

        //}
        return html;
    }

    $.displayMessage = function (msg) {
        if (debug)
            console.log(msg);
    }

    $.GetOuterHtml = function (obj) {
        return $('<div>').append($(obj).clone()).html();
    }

    $.AddColToTabl = function (colName) {
        var index = GetColIndexByName(colName);

        var headerContent = cloneTableObj.find("th[name='" + colName + "'] ");

        var headerRow = tblObj.find("tr:first");

        headerRow.append(headerContent)
        var currRowIndex = 1;
        cloneTableObj.find("tr td:nth-child(" + index + ")").each(function () {
            var content = $(this).clone();
            
            tblObj.find("tr").eq(currRowIndex).append(content);
            currRowIndex++;
        });

        $.ResetIndex(tblObj);

    }

    $.GetColIndexByName = function (colName) {
        return $(cloneTableObj).find("th[name='" + colName + "'] ").attr("index");
    }

    $.GetObjColIndexByName = function (obj, colName) {
        return $(obj).find("th[name='" + colName + "'] ").attr("index");
    }

    $.fn.initGroupBy = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('pluginName')) {
                tblObj = $(this);
                //cloneTableObj =$.tableStruct().clone().hide()
                cloneTableObj = tblObj.clone().hide();
                console.log(cloneTableObj);
                $(dropHtml).insertBefore(tblObj);
                ////tblObj.find('thead')

                //var plugin = new $.initGroupBy(this, options);
                var plugin = new $.initGroupBy();
                //$.InitDraggable();
                //$(this).data('pluginName', plugin);
            }
        });
    }
    $.tableStruct = function () {
        var tableCloned = $("table#tblUser");
        $('.colHeader').each(function (index) {
            var i = index + 1;
                var show = $(this).attr('data-show');
                var colIndex = $(this).attr('data-index');
                if (show != "true") {
                    debugger;
                    $(tableCloned).find("td:nth-child(" + colIndex + ")").hide();
                }
            });
            return tableCloned;
    }
})(jQuery);

