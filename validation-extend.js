/**
 * 專門處理表單類元件互動效果函式
 */
jQuery.extend(jQuery.validator.messages, {
    required: "此欄位必須填寫.",
    remote: "輸入值檢查錯誤，請重新輸入.",
    email: "請輸入正確電子郵件.",
    url: "請輸入網址",
    date: "請輸入日期格式",
    dateISO: "請輸入有效的日期 (YYYY-MM-DD)",
    number: " 此欄位只能填寫數字/小數點與負號.",
    digits: "此欄位只能填寫數字",
    creditcard: "請輸入有效的信用卡號碼",
    equalTo: "資料比對不符，請重新修改.",
    accept: "Please enter a value with a valid extension.",
    maxlength: $.validator.format( "最多 {0} 個字" ),
    minlength: $.validator.format( "最少 {0} 個字" ),
    rangelength: $.validator.format( "請輸入長度為 {0} 至 {1} 之間的字串" ),
    range: $.validator.format( "請輸入 {0} 至 {1} 之間的數值" ),
    max: $.validator.format( "請輸入不大於 {0} 的數值" ),
    min: $.validator.format( "請輸入不小於 {0} 的數值" )
});

/**
 * 加入於批量進貨使用的表單驗證，主要驗證多項欄位集合至少選填一項才能送出表單
 */
$.validator.addMethod("require_from_group", function(value, element, options){
    var numberRequired = options[0],
    selector = options[1],
    $fields = $(selector, element.form),
    validOrNot = $fields.filter(function() {
        return $(this).val();
    }).length >= numberRequired,
    validator = this;
    if(!$(element).data('being_validated')) {
        $fields.data('being_validated', true).each(function(){
            validator.valid(this);
        }).data('being_validated', false);
    }
    return validOrNot;
}, $.validator.format("至少要有一個品項有數量！"));

$(function(){
    $('.form-validation').each(function() {
        $(this).validate({
            errorClass : 'validation-fail',
            errorElement : 'p',
            focusCleanup : true,
        });
    });

    // form 至少必須填立一項欄位才可送出！
    if( $('.valid-atleastone').length ){
        $.validator.addClassRules("valid-atleastone", {
            require_from_group: [1,".valid-atleastone"]
        });
    }

    $.validator.addMethod("chRequired", $.validator.methods.required, "此項目至少必須設定一項.");
    if( $('.valid-checkreq').length ){
        $.validator.addClassRules("valid-checkreq", { chRequired: true });
    }
    $.validator.addMethod(
        "phoneRegex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "您輸入的電話格式錯誤請重新輸入"
    );
    if( $(".valid-phonenum").length ){
        $(".valid-phonenum").rules("add", { phoneRegex: /^(\(?0\d{1,2}\)?)?\-?\d{3,4}\-?\d{4}([#|\*]?\d+)?$/ });
    }
    if( $(".valid-price").length ){
        $(".valid-price").rules("add", { number: true });
    }
    if( $(".valid-confirmpw").length ){
        $(".valid-confirmpw").rules("add", { equalTo: "#password" });
    }
});
