# 定義資料夾和檔案路徑
$folderPath = "C:\santino\vite-bash"
$csvFilePath = "$folderPath\input.csv"
$excelFilePath = "$folderPath\output.xlsx"

生成csv 數據
$data = @"
Name,Age,Location
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago
"@

#將數據寫入csv文件
$data | Set-Content -Path $csvFilePath
Write-Host "CSV file created successfully."

# 讀取並顯示 csv 數據
$csvData = Import-Csv -Path  $csvFilePath
Write-Host "CSV data:"
$csvData | Format-Table -AutoSize

# 將 csv 轉為 excel 檔案
$excel = New-Object -ComObject Excel.Application
$workbook = $excel.Workbooks.Add()
$worksheet = $workbook.Worksheets.Item(1)

# 寫入標題
$worksheet.Cells.Item(1, 1).Value = "Name"
$worksheet.Cells.Item(1, 2).Value = "Age"
$worksheet.Cells.Item(1, 3).Value = "Location"
# 寫入數據
$row = 2
foreach ($entry in $csvData) {
    $worksheet.Cells.Item($row, 1).Value = $entry.Name
    $worksheet.Cells.Item($row, 2).Value = $entry.Age
    $worksheet.Cells.Item($row, 3).Value = $entry.Location
    $row++
}
# 保存 Excel 檔案
$workbook.SaveAs($excelFilePath)
$workbook.Close($true)
$excel.Quit()

Write-Host "Excel 檔案已創建: $excelFilePath"
 #> excel_to_csv.ps1
