# Multi Theme POC LCD Mobile App

This is a LCD Configurator Application

## Execution Steps

- Install Dependencies(Which capacitor lan transfer plugin as well)

```bash
npm install
```

## Capacitor Lan Transfer Plugin

### installation

```bash
npm install github:solumApps/capacitor-lan-transfer
npx cap sync
```

## Build the application

```bash
ionic build
```

## Add platforms and sync the data

### Adding platforms

- Add android platform

```bash
npx cap add android
```

- Add ios platform

```bash
npx cap add ios
```

### Syncing platforms

- sync android platform

```bash
npx cap sync android
```

- sync ios platform

```bash

npx cap sync ios

```

## Modifications required in Android files

- In AndroidManifest.xml file

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

- Update the following the build.gradle which is a root file present in android

-- add this to buildscript

```gradle
ext {
    kotlin_version = '1.9.24'
}
```

-- add this to dependencies

```gradle
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
```
