// ==UserScript==
// @name         理工大学就业信息网投递记录
// @namespace    http://tampermonkey.net/
// @version      2025-09-24
// @description  try to take over the world!
// @author       CQUT-handsomeboy
// @match        https://cqut.cqbys.com/teachin
// @match        https://cqut.cqbys.com/teachin/index/domain/cqut
// @match        https://cqut.cqbys.com/teachin/index/domain/cqut/page/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cqbys.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {

        const VALUE_UNDER_CONSIDERATION = "🤔正在考虑"
        const VALUE_NOT_CONSIDERATION = "🫷不考虑"
        const VALUE_ALREADY_DELIVERED = "👌已投递"
        const VALUE_RECEIVED_INTERVIEW = "😀收到面试"
        const VALUE_INTERVIEW_FAILED = "🤡面试不通过"
        const VALUE_INTERVIEW_SUCCESS = "😎面试通过"
        const VALUE_NULL = "value_null"

        var header = $('ul.infoTit.teachinList.teachin-index-front-list')[0]
        $(header).find("li:first").removeClass("span9").addClass("span7")
        $(header).prepend("<li class=\"span2\">投递情况</li>")
        var rows = $('ul.infoList.teachinList')

        function clearAllValues() {
            var keys = GM_listValues()
            for(const key in keys){
                GM_deleteValue(key)
            }
        }

        rows.each(function(i,item) {
            $(item).find("li:first").removeClass("span9").addClass("span7")
            var companyName = $(item).find("li.span7").find("a")[0].text
            var teachinLink = $(item).find("li.span7").find("a")[0].href
            var companyState = GM_getValue(companyName,VALUE_NULL)
            if (companyState == VALUE_NULL)
            {
                GM_setValue(companyName,VALUE_UNDER_CONSIDERATION)
                companyState = VALUE_UNDER_CONSIDERATION
            }
            var selectLi = $("<li class=\"span2\"><select></select></li>");
            var li = selectLi.find("select")
            var option1 = $(`<option value='${VALUE_UNDER_CONSIDERATION}'>${VALUE_UNDER_CONSIDERATION}</option>`)
            var option2 = $(`<option value='${VALUE_NOT_CONSIDERATION}'>${VALUE_NOT_CONSIDERATION}</option>`)
            var option3 = $(`<option value='${VALUE_ALREADY_DELIVERED}'>${VALUE_ALREADY_DELIVERED}</option>`)
            var option4 = $(`<option value='${VALUE_RECEIVED_INTERVIEW}'>${VALUE_RECEIVED_INTERVIEW}</option>`)
            var option5 = $(`<option value='${VALUE_INTERVIEW_FAILED}'>${VALUE_INTERVIEW_FAILED}</option>`)
            var option6 = $(`<option value='${VALUE_INTERVIEW_SUCCESS}'>${VALUE_INTERVIEW_SUCCESS}</option>`)
            selectLi.find("select").append(option1)
            selectLi.find("select").append(option2)
            selectLi.find("select").append(option3)
            selectLi.find("select").append(option4)
            selectLi.find("select").append(option5)
            selectLi.find("select").append(option6)
            selectLi.find(`option[value=\"${companyState}\"]`).prop("selected",true)
            $(item).prepend(selectLi);
            selectLi.find("select").change(function() {
                var selectedValue = $(this).val();
                GM_setValue(companyName,selectedValue)
            });
        })

    })

})();