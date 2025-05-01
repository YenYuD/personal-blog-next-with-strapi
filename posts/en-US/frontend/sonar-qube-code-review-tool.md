---
title: "Simple and Effective Automated Code Review Software: SonarQube"
lang: "en-US"
date: 2024-10-28
category: "frontend"
Author: "@Emily D."
description: "SonarQube is an open-source code quality inspection software that's easy to install and cross-platform."
visibility: true
cover_image_path: "/image/upload/v1728458494/exbop391ptqcpb5j5fp2_d3o03e.jpg"
slug: "sonar-qube-code-review-tool"
---

Do you lack seniors at your company to help with code reviews, or are you always getting LGTM? SonarQube is an open-source code quality inspection software that's easy to install and cross-platform. It offers a free community version as well as a paid enterprise version. Its core concept is clean code, and it checks whether your code meets three criteria: **Security**, **Reliability**, and **Maintainability**.

### What Can SonarQube Do?

- Helps you catch bugs
- Identifies code smells
- Scans for security vulnerabilities
- Analyzes duplicate code
- Measures code coverage
- Assesses technical debt
- Integrates with tools like Jenkins, GitLab, GitHub, etc.

### What Programming Languages Does It Support?

[Here](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/languages/overview/) is a list of programming languages supported by SonarQube. In this analysis, we're working on a frontend Next.js project that uses TypeScript (& JavaScript), HTML, and CSS—all of which are within SonarQube's supported range.

### Step 1: Local Installation

There are two ways to install SonarQube: you can achieve it by installing Java and a ZIP file, or you can install it directly using a Docker image. Since I don't have Java installed on my computer, I chose the simpler Docker installation method.

1. Go to Docker Hub and find [sonarqube](https://hub.docker.com/_/sonarqube/)

   ```shell
   docker pull sonarqube
   ```

2. Start the server:

   ```shell
   docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
   ```

   Then open your browser and navigate to [http://localhost:9000](http://localhost:9000) to see the login screen.

3. Enter the default username and password `admin`. You'll be prompted to reset your password. After updating it, you can access the dashboard.

4. 

   ![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.06.54_vpxw07.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.06.54_vpxw07.png)

   SonarQube can integrate with multiple platforms. For convenience in this demonstration, we'll use a local project.

### Step 2: Create a Project

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.13.08_krdfm7.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.13.08_krdfm7.png)

Enter the project name and the key name for the project token that you'll use later. By default, it's your project display name. After confirming the default branch for the project, click **Next**.

### Step 3: Set the Criteria for "New Code"

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.17.36_xllpsg.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.17.36_xllpsg.png)

SonarQube focuses on analyzing "newly generated" code. This means that after you analyze once, the second time it will focus on the new changes you've made. Here you can set the criteria for SonarQube to judge "new code." Since there's no specific requirement at the moment, we'll choose the default option.

After creation, you'll reach this screen:

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.24.25_hba5xt.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.24.25_hba5xt.png)

There are many options to integrate with CI platforms. For the purpose of this introduction, we'll use **Locally** to perform code analysis on our machine.

### Step 4: Generate a Token for the Project

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.28.48_c9xwva.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.28.48_c9xwva.png)

Click **Generate** to create a dedicated token for your project. This token must be kept securely in a private place.

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.29.12_ymhcoo.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767401/Xnapper-2024-10-24-14.29.12_ymhcoo.png)

Click **Continue**, and SonarQube will prompt you to install the appropriate Scanner for your operating system.

### Step 5: Install the Scanner

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.33.11_lyipod.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.33.11_lyipod.png)

You can click on the [official documentation for the Scanner](https://docs.sonarsource.com/sonarqube/10.7/analyzing-source-code/scanners/sonarscanner/) for installation methods.

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.41.48_cwl1cb.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-14.41.48_cwl1cb.png)

I'm currently using macOS M2. If you're unsure whether to install macOS x64 or macOS AArch64 on your Mac, you can type `uname -a` in the terminal.

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729768088/Xnapper-2024-10-24-14.43.26_m8edqu.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729768088/Xnapper-2024-10-24-14.43.26_m8edqu.png)

If it shows `arm64`, please install **macOS AArch64**; if it shows `x64`, install **macOS x64**. Although the official documentation states that ARM architecture is not yet officially supported, users have reported normal operation. I haven't encountered any issues during installation and use so far. After downloading, just unzip it.

### Step 6: Project Configuration File

In the root directory of the project you want to analyze, add a file named `sonar-project.properties`.

The official documentation provides an example:

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

If you want to make some other settings, you can uncomment the lines below.

- **sonar.projectName**: Defines the name of the project. If not set, it will use `sonar.projectKey` directly.
- **sonar.projectVersion**: Defines the version of the project. You can set this property to `1.0`, so when the project analysis results are submitted to SonarQube, it will display version information, which is helpful for version tracking.
- **sonar.sources**: Sets the current path of the code. If there's no special requirement, keeping `.` is fine.
- **sonar.sourceEncoding**: Encoding format, default is UTF-8.

### Step 7: Install SonarScanner CLI

1. Open the Scanner folder you just unzipped, find the `/conf` folder, and open the `sonar-scanner.properties` file inside.
2. Uncomment `sonar.host.url` and change the default value to `http://localhost:9000`. After the change, it should look like this:

   ```ini
   #----- SonarQube server URL (default to SonarCloud)
   sonar.host.url=http://localhost:9000
   ```

3. Add `<your Scanner installation path>/bin` to the global environment variable. Here I'm using zsh and vim. In the terminal, enter `vim ~/.zshrc` (if using Bash, enter `vim ~/.bashrc`). Then open the editor and paste:

   ```shell
   export PATH=$PATH:<your Scanner installation path>/bin
   ```

   If you want to know your Scanner installation path, navigate to the installation folder in the terminal and enter `pwd` to get the path. Replace `<your Scanner installation path>`, and it will look like this:

   ```shell
   # This is for Scanner CLI
   export PATH=$PATH:/Downloads/your-downloaded-folder/bin
   ```

   After saving and exiting the editor, to test if the installation was successful, enter `sonar-scanner -h` in the terminal. You should see the following output:

   ```zsh
   usage: sonar-scanner [options]

   Options:
   -D,--define <arg>     Define property
   -h,--help             Display help information
   -v,--version          Display version information
   -X,--debug            Produce execution debug output
   ```

   Alternatively, enter `sonar-scanner -v` to check version information. If there's no error, the CLI has been successfully installed!

### Step 8: Run the Scan

Next, paste the following command into the terminal to start the code analysis.

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-16.05.09_gtkgko.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767402/Xnapper-2024-10-24-16.05.09_gtkgko.png)

After running the code, the page will update to show your analysis results:

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.13.34_l3iekh.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.13.34_l3iekh.png)

Click on the **Issues** tab to view the problems in more detail.

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.17.09_arbogc.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.17.09_arbogc.png)

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.18.16_yjfsgc.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.18.16_yjfsgc.png)

### Technical Debt Chart

![https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.21.22_dd6qyt.png](https://res.cloudinary.com/dyrubjejf/image/upload/v1729767403/Xnapper-2024-10-24-16.21.22_dd6qyt.png)

The technical debt chart shows whether your project's code has technical debts that require a significant amount of time to address. The analysis consists of **Code Coverage**, **Lines of Code**, **Reliability Rating**, and **Security Rating**.

- **X-axis**: Represents the time required to address this technical debt—the further to the right, the greater the workload. In the figure above, one file has a technical debt workload exceeding 1 hour and 20 minutes, which needs attention.
- **Y-axis**: Represents the test coverage of the code—the higher up, the lower the coverage. This project hasn't started writing unit tests yet, so the coverage is 0.
- **Circle Size**: The larger the circle, the more lines of code it contains.
- **Color**: Represents levels of reliability and security, graded from A to E from good to bad. The darker the color, the more severe the code issues.

### Conclusion

With this code inspection tool, you can run analyses at any time to prevent yourself from accumulating technical debt during development. Start by running it locally, and hopefully, in the future, it can be integrated into the company's GitLab CI.

### References

- [It Turns Out Code Quality Can Also Be Inspected: A First Look at SonarQube](https://medium.com/starbugs/%E5%8E%9F%E4%BE%86%E7%A8%8B%E5%BC%8F%E7%A2%BC%E5%93%81%E8%B3%AA%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%A2%AB%E6%AA%A2%E6%B8%AC-%E5%88%9D%E6%8E%A2-sonarqube-14e99687806e)
- [Let SonarQube Be Your Bad Code Gatekeeper](https://rexhung0302.github.io/2022/12/12/20221212/)
- [SonarQube Documentation](https://docs.sonarsource.com/sonarqube/latest/)