---
title: "簡單好用的自動Code Review軟體：SonarQube"
lang: "zh-TW"
publish_at: 2024-10-24
category: "frontend"
Author: "@Emily D."
description: "在公司沒有Senior幫你code review，或者總是被LGTM嗎？SonarQube是個開源程式碼品質檢測軟體，安裝簡單且跨平台，有免費的community 版本，也有付費的企業版本。其核心概念是clean code，會去檢測你的程式碼是否符合「安全性、可靠性、可維護性」三項指標。"
visibility: true
cover_image_path: "/image/upload/v1728458494/exbop391ptqcpb5j5fp2_d3o03e.jpg"
slug: "sonar-qube-code-review-tool"
---


在公司沒有Senior幫你code review，或者總是被LGTM嗎？SonarQube是個開源程式碼品質檢測軟體，安裝簡單且跨平台，有免費的community 版本，也有付費的企業版本。其核心概念是clean code，會去檢測你的程式碼是否符合「安全性、可靠性、可維護性」三項指標。

### SonarQube 可以做什麼？
- 幫你抓bug
- 程式碼異味（Code Smells）識別
- 安全性漏洞（Security Vulnerabilities）掃描
- 重複程式碼（Duplications）分析
- 程式碼覆蓋率（Code Coverage）測量
- 技術債務（Technical Debt）評估
- 整合Jenkins、GitLab、GitHub 等工具

### 支援什麼程式語言？
[這裡](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/languages/overview/)列出了SonarQube 支援的程式語言，這次分析的是前端的Next.js專案，使用到TypeScript（& JavaScript), HTML, CSS，這些都包含在SonarQube的支援範圍裡面。


### 第一步：本地安裝
安裝SonarQube有兩種方法，可以透過安裝Java和ZIP file達成，也可以直接用Docker Image安裝。
由於我的電腦本身沒有安裝Java，我選擇比較簡單的Docker安裝方法。

1.到docker hub上找到 [sonarqube](https://hub.docker.com/_/sonarqube/)
```shell
docker pull sonarqube
```

2.啟動server:
```shell 
$ docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
```

接著開啟瀏覽器，連到[http://localhost:9000](http://localhost:9000)
會看到登入畫面。

4.
輸入預設帳號密碼admin
會出現重設密碼的畫面，更新完密碼就可以進入dashboard。

5.
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.06.54_vpxw07.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.06.54_vpxw07.png)

SonarQube 可以整合多個平台，這邊為了方便示範，使用local project。

### 第二步：建立專案
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.13.08_krdfm7.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.13.08_krdfm7.png)
輸入專案名稱，
以及稍後會用到的project token的key name，預設是你的project display name。
確認好專案的預設分支後，點擊next。

### 第三步：設定「新程式碼」的判斷標準
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.17.36_xllpsg.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.17.36_xllpsg.png)
SonarQube 會專注在分析「新產生的」程式碼，也就是當你分析過一遍，第二遍時將會專注在你新產生的變更。這邊可以設定SoanrQube對「新程式碼」的判斷標準。
由於目前沒有特定的需求，所以這邊選擇預設選項。


建立完成後，會來到這個畫面：
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.24.25_hba5xt.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.24.25_hba5xt.png)
有很多整合到CI平台的選項。為方便介紹，我們使用locally，在本地進行程式碼分析。

### 第四步：為專案產生token
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.28.48_c9xwva.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.28.48_c9xwva.png)
按下generate，會為你的專案產生專用的token，這個token必須好好保管在隱密的地方。

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.29.12_ymhcoo.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.29.12_ymhcoo.png)
按下contiune，SonarQube會請你針對自己的作業系統安裝相對應的Scanner。

### 第五步：安裝Scanner
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.33.11_lyipod.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.33.11_lyipod.png)

安裝方法可以點擊[Scanner的官方文件](https://docs.sonarsource.com/sonarqube/10.7/analyzing-source-code/scanners/sonarscanner/)。
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.41.48_cwl1cb.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.41.48_cwl1cb.png)

目前本機使用的作業系統是macOS M2，
如果你不知道你的Mac應該安裝macOS x64還是 macOS AArch64，
可以在terminal 輸入`uname -a`
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729768088/Xnapper-2024-10-24-14.43.26_m8edqu.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729768088/Xnapper-2024-10-24-14.43.26_m8edqu.png)
如果顯示arm64，請安裝 macOSAArch64，如果顯示x64，請安裝macOS x64。
雖然官方說明尚未正式支援ARM架構，但已有使用者回報可正常運作。目前安裝及使用下來沒有遇到問題。
下載後解壓縮即可。

### 第六步：專案設定檔
在你想要分析的專案的根目錄，新增文件`sonar-project.properties`

官方文件已經附上了範例，
```ini
# must be unique in a given SonarQube instance
sonar.projectKey=my-personal-blog

# --- optional properties ---

# defaults to project key
#sonar.projectName=My project
# defaults to 'not provided'
#sonar.projectVersion=1.0
 
# Path is relative to the sonar-project.properties file. Defaults to .
#sonar.sources=.
 
# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8

```

如果你想要做一些其他的設定，可以取消下面的註解。
- `projectName`: 用來定義專案的名稱，如果不設定，將會直接使用`projectKey`。
- `projectVersion`: 用來定義專案的版本，你可以設置這個屬性為 `1.0`，這樣當專案分析結果提交到SonarQube 時，它會顯示版本資訊。有利於追蹤版本。
- `sources`:設定程式碼當前路徑，如果沒有特殊需求，保持. 即可
- `sourceEncoding`: 編碼格式，預設為UTF-8


### 第七步：安裝SonarScanner CLI
- 1.打開你剛解壓縮的Scanner資料夾，找到/conf 資料夾，打開裡面的`sonar-scanner.properties` 檔案。
- 2.取消註解`sonar.host.url`，並將預設值更改為`http://localhost:9000`。更改後應該會像這樣：
```ini
#----- SonarQube server URL (default to SonarCloud)
sonar.host.url=http://localhost:9000
```
- 3.將`<你的Scanner安裝位置>/bin`加入全域環境變數，這邊使用zsh和vim，在終端機輸入`vim ~/.zshrc`  （若使用Bash，輸入 `vim ~/.bashrc`。） 接著開啟編輯模式，貼上
```shell
export PATH=$PATH:<你的Scannar安裝路徑>/bin
```
如果你想知道你的Scannar安裝路徑是什麼，用終端機進到安裝的資料夾，再輸入`pwd`，就可以得到路徑。把`<你的Scannar安裝路徑>`替換掉， 會長這樣：
```shell
# This is for Scanner CLI
export PATH=$PATH:/Downloads/your-downloaded-folder/bin
```

儲存後退出編輯器，想測試有沒有安裝成功，輸入`sonar-scanner -h`，你應該會看到終端機顯示以下畫面：
```zsh
usage: sonar-scanner [options]

Options:
-D,--define <arg>     Define property
-h,--help             Display help information
-v,--version          Display version information
-X,--debug            Produce execution debug output

```

或者輸入`sonar-scanner -v` 確認版本資訊，如果沒有報錯，就表示CLI安裝成功囉！

### 第八步：執行掃描

接下來把以下指令貼到終端機，就會開始執行程式碼分析。
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-16.05.09_gtkgko.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-16.05.09_gtkgko.png)

跑完程式碼後，頁面會更新，顯示你的分析結果：
![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.13.34_l3iekh.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.13.34_l3iekh.png)

點到`Issues` tab，可以更詳細地查看問題。

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.17.09_arbogc.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.17.09_arbogc.png)

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.18.16_yjfsgc.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.18.16_yjfsgc.png)

### 技術債圖表

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.21.22_dd6qyt.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.21.22_dd6qyt.png)

技術債圖表顯示你的專案程式碼是否有需要花大量時間處理的技術債務，分析組成為`測試覆蓋率(Coverage)`、`程式碼行數(Lines of codes)`、`可靠性評分(Reliability Rating)`、`安全性評分(Security Rating)`。

`X軸`代表處理這個技術債所需花費的時間，越右邊代表工作量越大，在上圖有一隻檔案的技術債工作量超過1hr 20mins，就是需要注意處理的地方。

`Y軸`代表程式碼的測試覆蓋率，越上面越低，這個專案還沒有開始撰寫單元測試，所以覆蓋率為0。

`圓圈`越大，代表程式碼行數越多

`顏色`代表可靠性和安全性等級，從好到壞分為A~E等級，顏色越深，代表程式碼問題越嚴重。


### 結論
有了這個程式碼檢測工具，就可以隨時跑分析，防止自己在開發時債台高築，先從本地執行開始，希望之後可以進展到整合進公司的Gitlab CI。


參考資料：
- [原來程式碼品質也可以被檢測：初探 SonarQube](https://medium.com/starbugs/%E5%8E%9F%E4%BE%86%E7%A8%8B%E5%BC%8F%E7%A2%BC%E5%93%81%E8%B3%AA%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%A2%AB%E6%AA%A2%E6%B8%AC-%E5%88%9D%E6%8E%A2-sonarqube-14e99687806e)
- [讓 SonarQube 成為你的糞 Code 守門員](https://rexhung0302.github.io/2022/12/12/20221212/)
- [SonarQube Documentaion](https://docs.sonarsource.com/sonarqube/latest/)

