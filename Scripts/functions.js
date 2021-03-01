/*eslint eqeqeq: ["error", "smart"]*/

// mobile flag
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// add a tolowercase method to numbers
Number.prototype.toLowerCase = function (value) {
    return value;
}

// equals
String.prototype.isEqual = function (value) {
    return this.toUpperCase() === value.toUpperCase();
};

// contains
String.prototype.contains = function (value) {
    return this.toLowerCase().indexOf(value.toLowerCase()) !== -1;
};

// has value
String.prototype.HasValue = function (value) {
    return this.trim().length > 0;
};

// is blank
String.prototype.IsBlank = function (value) {
    return this.trim().length === 0;
};

// starts with
String.prototype.startsWith = function (value) {
    return this.toLowerCase().slice(0, value.toLowerCase().length) === value.toLowerCase();
};

// ends with
String.prototype.endsWith = function (value) {
    return this.toLowerCase().slice(-value.toLowerCase().length) === value.toLowerCase();
};

// replace last occurrance in string
String.prototype.replaceLast = function (what, replacement) {
    var pcs = this.split(what);
    var lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
};

// format
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined'
          ? args[number]
          : match
        ;
    });
};

// replace
String.prototype.replaceAll = function (value, replacement) {
    var reg = new RegExp(value, 'ig');
    return this.replace(reg, replacement);
};

// convert ms ajax date to javascript date; e.g. /Date(1492025224000)/
String.prototype.convertAjaxDate = function (value) {
    return new Date(parseInt(this.substr(6)));
};

// valid number
function IsValidNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// valid integer
function IsValidInteger(n) {
    return /^\d+$/.test(n);
}

// valid email
function IsValidEmail(str) {
    // regular expression
    var re = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", "i");

    // test
    if (str.match(re))
        return true;
    else
        return false;
}

// valid email (multiple)
function IsValidEmails(str) {
    // variables
    var emails = str.split(';');

    // loop
    for (var i = 0; i < emails.length; i++) {
        var email = trim(emails[i]);

        if (!IsValidEmail(email)) {
            return false;
        }
    }

    // return
    return true;
}

// valid phone number
function IsValidPhoneNumber(str) {
    // regular expression
    var re = new RegExp(/^[01]?[- .]?(\([2-9]\d{2}\)|[2-9]\d{2})[- .]?\d{3}[- .]?\d{4}$/);

    // test
    if (str.match(re))
        return true;
    else
        return false;
}

// valid zip
function IsValidZip(str) {
    // remove spaces
    str = str.replace(/ /g, "");

    // regular expression
    var us = /^\d{5}$/
    var ca = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z]\d[A-Z]\d$/i

    // test
    if (str.match(us) || str.match(ca))
        return true;
    else
        return false;
}

// valid website
function IsValidWebsite(str) {
    // regular expression
    var re = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/i

    // test
    if (str.match(re))
        return true;
    else
        return false;
}

String.prototype.toDate = function (format) {
    format = format || "dmy";
    var separator = this.match(/[^0-9]/)[0];
    var components = this.split(separator);
    var day, month, year;
    for (var key in format) {
        var fmt_value = format[key];
        var value = components[key];
        switch (fmt_value) {
            case "d":
                day = parseInt(value);
                break;
            case "m":
                month = parseInt(value) - 1;
                break;
            case "y":
                year = parseInt(value);
        }
    }
    return new Date(year, month, day);
};

// valid date
function IsValidDate(str)
{
    var matches = str.split('/');
    var m = parseInt(matches[0], 10) - 1;
    var d = parseInt(matches[1], 10);
    var y = parseInt(matches[2], 10);
    var date = new Date(y, m, d);
    return date.getDate() === d && date.getMonth() === m && date.getFullYear() === y;
}

// pad
function Pad(val, ch, num) {
    val = val.toString();
    return val.length < num ? Pad(ch + val, ch, num) : val;
}

// lpad
String.prototype.lpad = function (padString, length) {
    var str = this;
    if (str.length > 0)
        while (str.length < length)
            str = padString + str;
    return str;
}

function roundToPrecision(value, precision) {
    precision = (typeof precision !== 'undefined') ? precision : 3;
    var mult = Math.pow(10, precision);

    return Math.round(mult * value) / mult;
}


// popup window
function PopUp(Url, Name, Width, Height) {
    // variables
    var Left = parseInt((screen.availWidth / 2) - (Width / 2));
    var Top = parseInt((screen.availHeight / 2) - (Height / 2));

    // open window
    var MyWindow = window.open(Url, "Name", "menubar=no, location=no, status=no, resizable=no, scrollbars=yes, titlebar=no, width={0}, height={1}, left={2}, top={3}, screenX={2}, screenY={3}".format(Width, Height, Left, Top));

    // focus
    MyWindow.focus();

    // return
    return false;
}

function GetValueFromQueryString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results === null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}


//Center the element
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
}

//blockUI
function blockUI() {
    $.blockUI({
        css: {
            backgroundColor: 'transparent',
            border: 'none'
        },
        message: '<div class="spinner"></div>',
        baseZ: 1500,
        overlayCSS: {
            backgroundColor: '#FFFFFF',
            opacity: 0.7,
            cursor: 'wait'
        }
    });
    $('.blockUI.blockMsg').center();
}//end Blockui

//blockUI
function blockUIMessage() {
    $.blockUI({
        css: {
            backgroundColor: 'transparent',
            border: 'none'
        },
        message: '<div class="spinner"></div><div class="message">Please wait while we gather the data...</div>',
        baseZ: 1500,
        overlayCSS: {
            backgroundColor: '#FFFFFF',
            opacity: 0.7,
            cursor: 'wait'
        }
    });
    $('.blockUI.blockMsg').center();
}//end Blockui

// show progress modal
function ShowProgress() {
    blockUI();
}

// show progress modal with message
function ShowProgressMessage() {
    blockUIMessage();
}

// hide progress modal
function HideProgress() {
    $.unblockUI();
}

// create an array to store modal id's
var modalmanager = [];
// modal stack offset
var offset = 25;

// show modal
function ShowModal(ID, Keyboard, OnShownCallback, OnCloseCallback) {
    // methods to execute when modal is shown
    var OnShownFunctions = [];

    // bind escape key
    if (Keyboard) {
        OnShownFunctions.push(
            function () {
                $(window).keydown(function (e) {
                    if (e.keyCode === 13 || e.keyCode === 27) {
                        HideModal(ID);
                        e.preventDefault();
                    }
                })
            }
        );

    }

    // stack modals if one is already open
    $(ID).find(".modal-content").first().css("top", "{0}px".format(modalmanager.length * offset));

    // check if any form elements have focus class
    var focus = $(ID).find(".modal-content").first().find(".focus");

    // add focus
    if (focus.length > 0) {
        OnShownFunctions.push(function () { $(focus).focus() });
    }

    // add shown call back
    if (OnShownCallback !== undefined && OnShownCallback !== null) {
        OnShownFunctions.push(OnShownCallback);
    }

    // if any shown methods exist, add them to modal shown event
    if (OnShownFunctions.length > 0) {
        $(ID).on('shown.bs.modal', function () {
            // remove modal shown event
            $(ID).off('shown.bs.modal');

            // eval all functions
            $(OnShownFunctions).each(function () {
                eval($(this));
            })
        });
    }


    // add ID to modalmanager
    modalmanager.push(ID);

    // modal hidden event
    $(ID).on('hidden.bs.modal', function () {
        // remove modal hidden event
        $(ID).off('hidden.bs.modal')

        // remove bindings
        $(window).unbind('keydown');

        // controls
        var lblFocus = $("#lblFocus");
        var lblSelect = $("#lblSelect");

        // variables
        var Focus = lblFocus.length ? lblFocus.val().trim() : "";
        var Select = lblSelect.length ? lblSelect.val().trim() : "";

        // focus
        if (Focus.length > 0) {
            $("#" + Focus).focus();
        }

        // select
        if (Select.length > 0) {
            $("#" + Select).select();
        }

        // remove modal from modal manager
        //modalmanager = modalmanager.slice(modalmanager.indexOf(ID));
        modalmanager = modalmanager.filter(function (x) { return x !== ID })

        // check if there are any modals remaining open
        if (modalmanager.length > 0) {
            // add modal-open class because there is another modal remaining
            $("body").addClass("modal-open");
        }

        // callback
        if (OnCloseCallback !== undefined && OnCloseCallback !== null) {
            OnCloseCallback.apply(this);
        }
    });

    // show modal
    $(ID).modal();
}

// hide modal
function HideModal(ID) {
    // remove bindings
    $(window).unbind('keydown');

    // remove modal from modal manager
    modalmanager = modalmanager.filter(function (x) { return x !== ID })

    // check if there are any modals remaining open
    if (modalmanager.length > 0) {
        // add modal-open class because there is another modal remaining
        $("body").addClass("modal-open");
    }

    // hide modal
    $(ID).modal('hide');
}

// show message
function ShowMessage(Message, FocusID, SelectID, ModalTitle) {
    // defaults
    if (!ModalTitle) {
        ModalTitle = "";
    }

    // clear
    $('div.message').html('');
    $('#lblFocus').val('');
    $('#lblSelect').val('');
    $('#lblMessageModalTitle').text("Message");

    // message
    if (Message && Message.length > 0) {
        $('div.message').html(Message);
    }

    // focus
    if (FocusID && FocusID.length > 0) {
        $('#lblFocus').val(FocusID);
    }

    // select
    if (SelectID && SelectID.length > 0) {
        $('#lblSelect').val(SelectID);
    }

    // modal title
    if (ModalTitle && ModalTitle.HasValue()) {
        $('#lblMessageModalTitle').text(ModalTitle);
    }

    // show modal
    ShowModal('#modal-message', true);
}

// show confirm
function ShowConfirm(Message, Title, YesCallback, NoCallback) {
    // controls
    var lblConfirmMessageTitle = $("#lblConfirmMessageTitle");
    var confirmMessage = $("#confirm-message");
    var btnConfirmYes = $("#btnConfirmYes");
    var btnConfirmNo = $("#btnConfirmNo");

    // set values
    lblConfirmMessageTitle.html(Title);
    confirmMessage.html(Message);

    // remove existing events
    btnConfirmYes.off("click");
    btnConfirmNo.off("click");

    // yes click
    btnConfirmYes.on("click", function () {
        HideModal("#modal-confirm");
        if (YesCallback !== undefined && YesCallback !== null) {
            YesCallback.apply(this);
        }
    });

    // no click
    btnConfirmNo.on("click", function () {
        HideModal("#modal-confirm");
        if (NoCallback !== undefined && NoCallback !== null) {
            NoCallback.apply(this);
        }
    });

    // show modal
    ShowModal("#modal-confirm");

    return;
}

function FindKey(container, field, name) {
    var data = jQuery.grep(container,
                           function (element, index) {
                               return element[field] === name;
                           });
    return data;
}

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

// google analytics helper
// ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
function TrackEvent(command, hitType, eventCategory, eventAction, eventLabel) {
    try {
        // send event
        ga(command, hitType, eventCategory, eventAction, eventLabel);
    }
    catch (ex) {
        // log error
        console.log(ex.message);
    }

    // log event
    console.log("command={0}; hitType={1}; eventCategory={2}; eventAction={3}; eventLabel={4}".format(command, hitType, eventCategory, eventAction, eventLabel));
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// rebind one multiselect
function BindMultiSelect(id) {
    // destroy
    $('select[multiple]#{0}'.format(id)).multiselect("destroy");

        // rebind multiselect
        $('select[multiple]#{0}'.format(id)).multiselect({
            buttonWidth: '100%', numberDisplayed: 5,
        });

        // fix 100% multiselect width caret position
        $(".caret").css('float', 'right');
        $(".caret").css('margin', '12px 0');
};

// rebind all multiselects
function BindMultiSelects() {
    // destroy
    $(".multiselect-native-select").removeClass("multiselect-native-select");
    $('select[multiple]').multiselect("destroy");


    // rebind multiselect
    $('select[multiple]').multiselect({
        buttonWidth: '100%', numberDisplayed: 5,
    });

    // fix 100% multiselect width caret position
    $(".caret").css('float', 'right');
    $(".caret").css('margin', '12px 0');

};

function removeByIndex(array, index) {
    return array.filter(function (elem, _index) {
        return index !== _index;
    });
}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ChartInitialization(event) {
    var chart = event.chart;
    if (chart.export && chart.export.menu) {
        var menu = chart.export.config.menu[0].menu;
        menu = removeByIndex(menu, 1);
        menu = removeByIndex(menu, 1);
        menu = removeByIndex(menu, 1);
        menu.push({
            "label": "Change Date Range",
            "click": function () {
                alert("Change Date Range");
            }
        });

        menu.push({
            "label": "Export",
            "click": function () {
                ShowProgress(); setTimeout(function () {
                    HideProgress();
                    alert("Data Exported");
                }, 2000);
            }
        });
        chart.export.config.menu[0].menu = menu;
    }
    //console.log(chart);
    //console.log(event);
}

function BuildPieChart(targetDiv, chartTitle, dataProvider, allowExport) {
    if (allowExport === null) {
        allowExport = true;
    }
    try {
        var chart = AmCharts.makeChart(targetDiv, {
            "type": "pie",
            /*"listeners": [{ "event": "init", "method": chartInit }, { "event": "clickSlice", "method": function(event) { ShowProgress(); setTimeout(function() { HideProgress(); }, 2000); } }],*/
            "legend": {
                "align": "center",
                "position": "bottom",
                "markerType": "square",
            },
            "titles": [
                {
                    "text": chartTitle,
                    "bold": 0,
                    "size": 15
                }
            ],
            "startDate": "",
            "endDate": "",
            "chartType": "",
            "addClassNames": true,
            "theme": "light",
            "startDuration": 0,
            "dataProvider": dataProvider,
            "valueField": "value",
            "titleField": "hauler",
            "colorField": "color",
            "pulledField": "pullOut",
            "pullOutOnlyOne": true,
            "legendColorField": "color",
            "autoMargins": false,
            "marginTop": 20,
            "marginBottom": 20,
            "marginLeft": 0,
            "marginRight": 0,
            "pullOutRadius": 10,
            "labelFunction": function (info) {
                var data = info.dataContext;
                return info.percents.toFixed(1).toString() + '%';
            },
            "outlineAlpha": 0,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "export": {
                "enabled": allowExport
            }
        });
        return chart;
        //console.log(chart);
    } catch (ex) {
        alert(ex.message);
    }
}

var defaults = {
    allowExport : true,
    labelrotation: 0,
    legend: true
}

function BuildBarChart(targetDiv, chartTitle, dataProvider, graphs, allowExport, labelrotation, legend) {

    if (allowExport === null) {
        allowExport = defaults.allowExport;
    }

    if (labelrotation === null) {
        labelrotation = defaults.labelrotation;
    }

    if (legend === null) {
        legend = defaults.legend;
    }

    try {
        return AmCharts.makeChart(targetDiv, {
            "legend": {
                "useGraphSettings": true,
                "align": "center",
                "position": "bottom",
                "marginRight": 0,
                "markerType": "circle",
                "right": -4,
                "valueWidth": 10,
                "enabled": legend
            },
            "titles": [
                {
                    "text": chartTitle,
                    "bold": 0,
                    "size": 15
                }
            ],
            "addClassNames": true,
            "theme": "light",
            "type": "serial",
            /*"listeners": [{ "event": "init", "method": chartInit }, { "event": "clickSlice", "method": function (event) { ShowProgress(); setTimeout(function () { HideProgress(); }, 2000); } }],*/
            "dataProvider": dataProvider,
            "valueAxes": [{
                "position": "left",
                "precision": 0,
                "minimum" : 0
            }],
            "columnSpacing": 0,
            "startDuration": 0,
            "graphs": graphs,
            "angle": 0,
            "depth3D": 0,
            "categoryField": "year",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": labelrotation
            },
            "export": {
                "enabled": allowExport
            },
            "numberFormatter": {
                "precision": 2,
                "thousandSeparator" : ","
            }
        });
    } catch (ex) {
        alert(ex.message);
    }

}

function GetAMCharts() {
    return AmCharts;
}

function SetValue(target, value, hideifempty) {
    // default to hide if empty
    if (hideifempty === null) { hideifempty = true; }

    // trim value
    value = value.trim();

    // hide if empty
    if (hideifempty && value.IsBlank()) {
        $("#{0}".format(target)).hide();
    } else {
        // set value
        $("#{0}".format(target)).val(value);
    }
}

// scroll viewport to bottom of element ensuring it is in the viewport
function scrollToBottom(ele, scrollele) {
    if (scrollele === null || scrollele === undefined) {
        scrollele = "html,body";
    }
    div_height = 360;
    div_offset = $(ele).offset().top;
    window_height = $(window).height();
    var scrollPos = $(scrollele).scrollTop();
    var scrollTo = div_offset - window_height + div_height;
    if (scrollPos < scrollTo) {
        $(scrollele).animate({
            scrollTop: div_offset - window_height + div_height
        }, 'slow');
    }
}

function YearsDiff(start, end) {
    var ynew = end.getFullYear();
    var mnew = end.getMonth();
    var dnew = end.getDate();
    var yold = start.getFullYear();
    var mold = start.getMonth();
    var dold = start.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
    else {
        if (mold == mnew) {
            if (dold > dnew) diff--;
        }
    }
    return diff;
}

function DaysDiff(start, end) {
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function trimString(s) {
    var l = 0, r = s.length - 1;
    while (l < s.length && s[l] == ' ') l++;
    while (r > l && s[r] == ' ') r -= 1;
    return s.substring(l, r + 1);
}

function compareObjects(o1, o2) {
    var k = '';
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
}

function itemExists(arr, tofind) {
    for (var i = 0; i < arr.length; i++) if (compareObjects(arr[i], tofind)) return true;
    return false;
}

function findInArr(toFind, arr) {
    var results = [];
    toFind = trimString(toFind); // trim it
    for (var i = 0; i < arr.length; i++) {
        for (var key in arr[i]) {
            if (arr[i][key].indexOf(toFind) != -1) {
                if (!itemExists(results, arr[i])) results.push(arr[i]);
            }
        }
    }
    return results;
}

function DetectBrowser() {
    // variables
    var userAgent = window.navigator.userAgent;

    // Opera 8.0+
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) { document.body.className += " opera"; return; }

    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined') { document.body.className += " firefox"; return; }

    // Safari 3.0+ "[object HTMLElementConstructor]"
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) { document.body.className += " safari"; return; }

    // Internet Explorer 6-11
    if ((!!document.documentMode && !!window.StyleMedia) && (/*@cc_on!@*/false || !!document.documentMode)) { document.body.className += " ie"; return; }

    // Edge 20+
    if (/Edge/.test(userAgent)) { document.body.className += " edge"; return; }

    // Chrome 1+
    if (!!window.chrome && !!window.chrome.webstore) { document.body.className += " chrome"; return; }

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) { document.body.className += " ios"; return; }
}

// detect browser on load
DetectBrowser();