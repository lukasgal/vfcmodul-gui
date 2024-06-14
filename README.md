vfcmodul-gui:1.0.0
===
App used by BMW project to simulate real app used to add VFC Objects into ServiceSolution documents.


> **For using of this tool on DEV/INT environment install the latest WAR from Nexus. You don't have to clone repository.**


## Development
- /frontend - [README.md](frontend/README.md)
- /backend - contains only web structure to run on Tomcat server

## Build & upload to Nexus server
- run following gradle command to build app and upload generated WAR to Nexus server.

  ```PowerShell
  ./gradlew  uploadArchives -PbuildNr={versionNumber} --stacktrace --console=plain
  ```
- the builds are available in Nexus server here:
[http://usdev007.usu.usu.grp/nexus/content/repositories/snapshots/de/usu/kcenter/custom/BMW/vfcmodul-gui/](http://usdev007.usu.usu.grp/nexus/content/repositories/snapshots/de/usu/kcenter/custom/BMW/vfcmodul-gui/)

## Install on server

The generated WAR is compatible with **usu-patchmanager** and new changes can be installed via this tool

### Tomcat:

1. extract/install the WAR to Tomcat server (the url path must be **http(s)://{host}/vfcmodul-gui**)
2. Copy the file from **/usu-knowledgebase/webapp/WEB-INF/config/gatekeeper.domain.properties** and paste it to **vfcmodul-gui/WEB-INF/config/**
3. Start Tomcat
4. Asssure that the app is running in list of apps in tomcat manager [http://localhost:8080/manager/html](http://localhost:8080/manager/html)

### InfoBoard: 

- In **knowldgecenter/configuration.do -> BMW Setting** add following config:

    * VFC-SAS host URL: https://bmw-rsa-asd-int.kcenter.usu.com or http://localhost:8080
    * VFC-SAS password : **password**

    * VFC-SAS browse path: **/vfcmodul-gui/pages/main.faces?system=RSA_ASD&password={password}&l={lang}&v={view}&fillinglevel=BL&fillinglevel=P1&at=tt&t={title}&fpt={connectionType}**

### Gatekeeper: 

1. add new application into **applications.xml**

```xml
<application id="vfcmodul-gui" name="VFC SASS" installed="true" ssoProvider="sso" autoAccess="false" autoAdminAccess="false" visible="true">
            <properties>
                <roles>
                    <role id="role" name="Access" type="boolean"/>
                </roles>
            </properties>
        </application> 

```
2. restart GK + Tomcat

3. Add **Access** permision to Gatekeeper roles - Administrator, Redakteure

## Directory Hierarchy
```
|—— .classpath
|—— .gitattributes
|—— .gitignore
|—— .project
|—— backend
|    |—— build.gradle
|    |—— src
|        |—— main
|            |—— webapp
|                |—— WEB-INF
|                    |—— config
|                        |—— gatekeeper.domain.properties
|                        |—— gatekeeper.local.properties
|                    |—— lib
|                    |—— web.xml
|—— bin
|—— build.gradle
|—— frontend
|    |—— .env
|    |—— .gitignore
|    |—— build.gradle
|    |—— package-lock.json
|    |—— package.json
|    |—— public
|        |—— delete.svg
|        |—— index.html
|        |—— locales
|            |—— de
|                |—— translations.json
|            |—— en
|                |—— translations.json
|        |—— manifest.json
|        |—— robots.txt
|    |—— README.md
|    |—— src
|        |—— .prettierrc
|        |—— @types
|            |—— index.d.ts
|        |—— App.css
|        |—— App.tsx
|        |—— components
|            |—— FulltextSearch.tsx
|            |—— ListDefectItems.tsx
|            |—— Panel.tsx
|            |—— SearchPanel.tsx
|            |—— SearchResult.tsx
|            |—— SelectedDefectsPanel.tsx
|            |—— Tab.tsx
|            |—— TabContent.tsx
|            |—— TabSet.tsx
|            |—— TreeItem.tsx
|        |—— dataGenerator.ts
|        |—— i18next
|            |—— config.ts
|        |—— index.css
|        |—— index.tsx
|        |—— logo.svg
|        |—— pages
|            |—— FreeTextEntryPage.tsx
|            |—— NoContentPage.tsx
|            |—— TreeStructureSelectPage.tsx
|        |—— react-app-env.d.ts
|        |—— reducers.ts
|        |—— reportWebVitals.ts
|        |—— setupTests.ts
|        |—— store.tsx
|        |—— styles
|            |—— Panel.css
|            |—— SelectedDefectPanel.css
|            |—— TabSet.css
|        |—— utils
|            |—— actions.ts
|    |—— tsconfig.json
|—— gradle
|    |—— wrapper
|        |—— gradle-wrapper.jar
|        |—— gradle-wrapper.properties
|—— gradle.properties
|—— gradlew
|—— gradlew.bat
|—— settings.gradle
```