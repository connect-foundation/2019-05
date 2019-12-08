<h1 align="center">Quick Kick</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <!--doc -->
  <a href="https://github.com/connect-foundation/2019-05/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <!--issue -->
  <a href="https://github.com/connect-foundation/2019-05/issues">
    <img alt="issue tracking" src="https://img.shields.io/github/issues/connect-foundation/2019-05"/>
  </a>
  <!--pr-->
  <a href="https://github.com/connect-foundation/2019-05/pulls">
    <img alt="pr tracking" src="https://img.shields.io/github/issues-pr/connect-foundation/2019-05"/>
  </a>
  
  <!--prettier-->
  <img alt="Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" />

  <!--license -->
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

<!-- main logo image -->

![title](https://ifh.cc/g/gf8O2.png)

> 간편한 풋살 매칭 웹 애플리케이션

## Demo

✨[quickkick.site][domain]

## Introduction

### **QuickKick은**

-   현재 아마추어(일반인) 팀이 풋살 한 게임을 하기 위해 투입해야 하는 불필요한 시간과 에너지를 줄여 아마추어 풋살 생태계를 활성화 시키고자 시작한 프로젝트입니다.

## Install

> client와 server 내에서 각각 실행해야 함.

```sh
yarn install
```

## Usage

```sh
yarn start
```

## Authors

**🔥Team UnderDoggs**
<br />

![title](https://ifh.cc/g/kzsOF.png)

-   Github:

    -   [@eastgerm](https://github.com/eastgerm) : (verbal)축구 담당
    -   [@polarb-raf](https://github.com/polarb-raf) : 무게(both of internal and external) 담당
    -   [@jongnan](https://github.com/jongnan) : (dog)드립 담당
    -   [@samrho](https://github.com/samrho) : Responsible for English and Documentation (추정)

## 사용 기술

![skill stack](https://ifh.cc/g/axgHK.jpg)

## 프로젝트 구조

```
📁root
├──📁client
│   ├──📁build
│   │   └──📁static
│   │       ├──📁css
│   │       ├──📁js
│   │       └──📁media
│   ├──📁cypress
│   │   ├──📁fixtures
│   │   ├──📁integration
│   │   ├──📁plugins
│   │   ├──📁screenshots
│   │   ├──📁support
│   │   └──📁videos
│   ├──📁conf
│   │   └──📁conf.d
│   ├──📁public
│   └──📁src
│       ├──📁App
│       ├──📁assets
│       │   └──📁images
│       ├──📁components
│       │   ├──📁common
│       │   │   ├──📁Button
│       │   │   ├──📁Footer
│       │   │   │   └──📁__snapshots__
│       │   │   ├──📁Header
│       │   │   │   └──📁__snapshots__
│       │   │   ├──📁MatchFilter
│       │   │   └──📁ViewTitle
│       │   ├──📁home
│       │   │   ├──📁HomeIntroduce
│       │   │   ├──📁HomeMatchStatus
│       │   │   ├──📁HomeQuickMatch
│       │   │   └──📁HomeTeamRanking
│       │   ├──📁match
│       │   │   ├──📁MatchList
│       │   │   └──📁MatchMap
│       │   ├──📁ranking
│       │   └──📁team
│       ├──📁contexts
│       │   ├──📁Filter
│       │   └──📁User
│       └──📁views
│           ├──📁error
│           ├──📁home
│           ├──📁match
│           ├──📁myteam
│           ├──📁ranking
│           └──📁team
└──📁server
    ├──📁generated
    │   └──📁prisma-client
    ├──📁middlewares
    ├──📁personal
    │   └──📁private
    │       └──📁client
    ├──📁routes
    ├──📁utils
    └──📁views
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/connect-foundation/2019-05/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

[wiki]: https://github.com/connect-foundation/2019-05/wiki
[domain]: https://quickkick.site
[issues]: https://github.com/connect-foundation/2019-05/issues
