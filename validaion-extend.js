/**
 * 專門處理表單類元件互動效果函式
 */
jQuery.extend(jQuery.validator.messages, {
    required: "此欄位必填.",
    remote: "輸入值檢查錯誤，請重新輸入.",
    email: "請輸入正確電子郵件.",
    url: "請輸入網址",
    date: "請輸入日期格式",
    dateISO: "Please enter a valid date (ISO).",
    number: " 此欄位只能填寫數字/小數點與負號.",
    digits: "此欄位只能填寫數字",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "資料比對不符，請重新修改.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
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
	$('.form-horizontal, .form').each(function() {
        $(this).validate({
    		errorClass : 'valid-block',
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

	$.validator.addMethod("cRequired", $.validator.methods.required, "此欄位必須填寫");
	if( $('.form-required').length ){
	    $.validator.addClassRules("form-required", { cRequired: true });
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
