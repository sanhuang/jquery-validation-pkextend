# jquery-validation-extend
擴充jquery-validation套件的欄位檢查項目以及預先中文化處理，同時針對要驗證表單配置className規則可於專案初始化後快速套用。

## Cahge log
v1.0.5
    - 新增獨立樣式，配置提示錯誤區塊樣式語法。
    - 調整判斷啟用jquery-validation偵測.form-validation樣式名稱。

v1.0.4
    - 修正validation-extend.js檔名錯誤。
    - 合併預設中文語系到validation-extend.js內。

v1.0.2
    - 排除非驗證機制程式碼。
    - 附加繁體中文語系處理。

v1.0.0
    - 初始化專案檔案，根據pkerp專案配置以下擴充表單驗證機制
        + 表單內至少必填一項欄位後才可送出。
        + 價格欄位檢查，接受數字與小數點。
        + 電話欄位檢查，以台灣地區電話號碼格式驗證(包含手機格式)。
        + 必填欄位檢查，使用固定樣式名稱判斷是否檢查。
