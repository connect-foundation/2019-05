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

|    Homepage    |      Demo(incomplete)      |       Issues       |
| :------------: | :------------------------: | :----------------: |
| 🏠[wiki][wiki] | ✨[quickkick.site][domain] | 🙋🏽‍♂️[issues][issues] |

## Introduction

### **QuickKick은**

-   현재 아마추어(일반인) 팀이 풋살 한 게임을 하기 위해 투입해야 하는 불필요한 시간과 에너지를 줄여 아마추어 풋살 생태계를 활성화 시키고자 시작한 프로젝트입니다.

### **현재 Naver 풋살 매칭 카페는?**

#### 1. 지역별 매치 정보를 한번에 볼 수 없다

-   게시판 지역별 카테고리가 잘게 나눠져 있어서 좋다.
-   근데 여러 지역에서 올라오는 매치를 한번에 볼 방법이 없네?
-   일일이 게시판 누르기 팔이 너무 아픈 감이 있다.

#### 2. 양식없이 게시글이 올라오기 때문에 검색이 힘들다

```
- 11/22(금) 오후 6시~8시 서울 상암월드컵경기장 풋살장 매치 구합니다
- 19.11.22 금요일 18~20시 서울 월드컵경기장 초청팀 구합니다
- 19년 11월 22일 금 18시 시작 상암동 월드컵 경기장 경기 있습니다
```

-   정확한 날짜, 시간, 장소가 있음에도 표기하는 방식이 달라 검색으로 원하는 정보를 찾아내기 어려움.

#### 3. 내가 원하는 시간대의 매치가 언제 올라올지는 아무도 모른다

-   원하는 매치가 게시판에 올라올때까지 수시로 확인하기 불편해!

#### 4. 상대팀의 객관적인 팀전력을 알 수가 없다

-   누구에겐 '하'가 누군가에겐 '상', 누구에겐 '상'이 누군가에겐 '하'.
-   풋살은 즐겁지만 10:0은 즐겁지 않다.

### **QuickKick은 무엇이 편리한가!**

#### 1. 원하는 지역별 매치 정보를 한번에 볼 수 있다

-   매치 등록 시 지역을 반드시 선택해야 하기 때문에 지역별 필터 기능이 가능.
-   여러 지역의 매치도 동시에 검색할 수 있다.

#### 2. 철저한 양식대로 게시글이 올라오기 때문에 검색이 매우 쉽다

-   날짜,시간,장소를 통일된 양식대로 입력하기 때문에 일관적인 검색 결과를 기대할 수 있다.

#### 3. 내가 원하는 시간대의 매치가 올라오는 즉시 알 수 있다

-   원하는 날짜,시간,장소를 고르고 알림 신청을 누르면 추후 조건을 만족하는 게시글이 올라오는 즉시 내 핸드폰으로 알림을 발송해준다.

#### 4. 랭킹 도입에 따라 상대팀의 객관적인 팀전력을 알 수가 있다

-   [ELO](https://https://en.wikipedia.org/wiki/Elo_rating_system)를 토대로 한 티어(레벨)를 제공함으로써 수준이 비슷한 팀들끼리 대전이 가능하다.

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

![skill stack](https://ifh.cc/g/bCoDU.jpg)

## 프로젝트 구조

```

📁client
├── 📁public
├── 📁src
│   ├── 📁App
│   ├── 📁assets
│   │   └── 📁images
│   ├── 📁components
│   │   ├── 📁common
│   │   │   ├── 📁Footer
│   │   │   ├── 📁Header
│   │   ├── 📁home
│   │   ├── 📁match
│   │   ├── 📁ranking
│   │   └── 📁team
📁server
├── 📁bin
├── 📁generated
│   └── 📁prisma-client
├── 📁middlewares
├── 📁routes
└── 📁views
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
