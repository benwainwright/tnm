## [1.11.0](https://github.com/benwainwright/tnm/compare/v1.10.0...v1.11.0) (2021-09-03)


### Features

* update planning mode so that you need to supply cook dates before you can submit a plan ([a510912](https://github.com/benwainwright/tnm/commit/a5109124876ed8c5da12961bec17a5da03a032da))

## [1.10.0](https://github.com/benwainwright/tnm/compare/v1.9.0...v1.10.0) (2021-09-02)


### Features

* change 'delivery plan' name to 'pack plan' ([8a4ab77](https://github.com/benwainwright/tnm/commit/8a4ab77d16d87341cd5dda31c10cc8f183006361))
* don't break pack plan up by delivery days ([905ce20](https://github.com/benwainwright/tnm/commit/905ce209ab35cc06d13c44a6239499e6ee21aeb2))
* remove address from pack plan ([a76832a](https://github.com/benwainwright/tnm/commit/a76832a844a16a2aab92f94283a5871a30a793a2))

## [1.9.0](https://github.com/benwainwright/tnm/compare/v1.8.1...v1.9.0) (2021-08-31)


### Features

* names in planner finalize table are now linked to the edit customer page ([7cfc5e9](https://github.com/benwainwright/tnm/commit/7cfc5e92a478f007173484918d6fee571f865cb4))


### Bug Fixes

* corrected colors for links ([306bba3](https://github.com/benwainwright/tnm/commit/306bba3c6f7b69d67d15a6c47df04efa2c3c28b0))

### [1.8.1](https://github.com/benwainwright/tnm/compare/v1.8.0...v1.8.1) (2021-08-31)


### Bug Fixes

* set some sensible disable criteria for the download buttons ([ff5484a](https://github.com/benwainwright/tnm/commit/ff5484aa4d32941940af6d4449d9323d72b8140c))

## [1.8.0](https://github.com/benwainwright/tnm/compare/v1.7.0...v1.8.0) (2021-08-31)


### Features

* enabled the cook plan download button ([998a139](https://github.com/benwainwright/tnm/commit/998a139800902e6945c748bffb50682bc47fbde0))


### Bug Fixes

* remove the letter 'C' to make the finalize table less intimidating ([101f2d0](https://github.com/benwainwright/tnm/commit/101f2d004be9953189b65121d2bea1f9723f7a4a))

## [1.7.0](https://github.com/benwainwright/tnm/compare/v1.6.1...v1.7.0) (2021-08-31)


### Features

* enabled the delivery plan download button ([b70a223](https://github.com/benwainwright/tnm/commit/b70a223f7bdf5ad8b9676daeba5bd555e02090c3))

### [1.6.1](https://github.com/benwainwright/tnm/compare/v1.6.0...v1.6.1) (2021-08-30)


### Bug Fixes

* fixed type error that was causing the app to crash with legacy customers ([4f64496](https://github.com/benwainwright/tnm/commit/4f64496fc54bc6d707956876804b0f521e801b2a))

## [1.6.0](https://github.com/benwainwright/tnm/compare/v1.5.2...v1.6.0) (2021-08-30)


### Features

* add new planning UX to work with the new planning data model ([aaebae7](https://github.com/benwainwright/tnm/commit/aaebae78560229b648cf1cbe5da011ae0c01527b))

### [1.5.2](https://github.com/benwainwright/tnm/compare/v1.5.1...v1.5.2) (2021-08-24)


### Bug Fixes

* fixed weird problem with navbar gaps (at least in modern browsers) ([7e3c59e](https://github.com/benwainwright/tnm/commit/7e3c59e5f7682e356db3848923e55af972962edc))

### [1.5.1](https://github.com/benwainwright/tnm/compare/v1.5.0...v1.5.1) (2021-08-23)


### Bug Fixes

* fixed "delivery one" being displayed twice on the plan panel ([93fc544](https://github.com/benwainwright/tnm/commit/93fc544984d0cb708c7c6adc169e1b958588c315))

## [1.5.0](https://github.com/benwainwright/tnm/compare/v1.4.0...v1.5.0) (2021-08-20)


### Features

* go back to customers page when you click save ([4c5f438](https://github.com/benwainwright/tnm/commit/4c5f438253716fd44c8a9bc98ff0b5fbff759890))

## [1.4.0](https://github.com/benwainwright/tnm/compare/v1.3.0...v1.4.0) (2021-08-19)


### Features

* changed the wording of the plan on the table ([ea3ebd8](https://github.com/benwainwright/tnm/commit/ea3ebd88d3c062553b38f9d0dc901843e8b619ac))

## [1.3.0](https://github.com/benwainwright/tnm/compare/v1.2.0...v1.3.0) (2021-08-19)


### Features

* add an alert when someone tries to leave for a different page ([cdee293](https://github.com/benwainwright/tnm/commit/cdee293413686d9ea1cc3d30b9e4fdc72a11c5a9))
* change new customer button to go the updated new customer page ([b3e1a15](https://github.com/benwainwright/tnm/commit/b3e1a15d81c781d0e3d458d9b7dd486745fd7e17))
* change title of new customer page when editing TRELLO-79 ([41cfad9](https://github.com/benwainwright/tnm/commit/41cfad92dab50db11afdbd77b597ad8284ee080f))
* disabled planner in order to implement the new customer input UX ([7688eb7](https://github.com/benwainwright/tnm/commit/7688eb73ce053776a31875bc03c64d328eda1a0a))
* display legacy plan on new customer page ([3e74fd2](https://github.com/benwainwright/tnm/commit/3e74fd270e1d49466017abc4b6d22c58f3360105))
* make it very clear when a customer is on a legacy plan ([9f349f4](https://github.com/benwainwright/tnm/commit/9f349f448b2334d5b73f4ed9e23bd527eea19547))
* new customer page enables/disables save button based on clean or dirty ([6a67427](https://github.com/benwainwright/tnm/commit/6a674274d3e982bb1992e8d835fc6b966d25d109))
* remove old ux ([22bb410](https://github.com/benwainwright/tnm/commit/22bb4106309a87a45b7439d5e28058a5627df6ad))


### Bug Fixes

* change the label of the download button to something more descriptive ([7355e2c](https://github.com/benwainwright/tnm/commit/7355e2cd2cd21a2f36b41d518030f4cab8b77497))
* formatted changelog ([9435860](https://github.com/benwainwright/tnm/commit/943586048686795610bc837db1fbafd41a6d19f4))
* remove unnecessary loading message ([b5f8d14](https://github.com/benwainwright/tnm/commit/b5f8d145dabf0286abc72470a75a9bbde39aa347))

## [1.2.0](https://github.com/benwainwright/tnm/compare/v1.1.2...v1.2.0) (2021-08-19)


### Features

* added first iteration of new customer entry UX TRELLO-79 ([1ed1a7a](https://github.com/benwainwright/tnm/commit/1ed1a7a82e7a326074b0e233466bd17909b647b2))
* customers page new link to the new customer entry page TRELLO-79 ([31a7497](https://github.com/benwainwright/tnm/commit/31a7497fad30dda000a647850694fd29c5b720b0))

### [1.1.2](https://github.com/benwainwright/tnm/compare/v1.1.1...v1.1.2) (2021-08-18)


### Bug Fixes

* made changelog more readable ([6395752](https://github.com/benwainwright/tnm/commit/6395752e5445b31cbf1f35fc92f75b522a7d095c))

### [1.1.1](https://github.com/benwainwright/tnm/compare/v1.1.0...v1.1.1) (2021-08-18)


### Bug Fixes

* corrected broken backend deletion code ([d2d0241](https://github.com/benwainwright/tnm/commit/d2d0241954e154e612d0b87044805510409db17c))

## [1.1.0](https://github.com/benwainwright/tnm/compare/v1.0.2...v1.1.0) (2021-08-18)


### Features

* deleted items can now be recovered by contacting Ben ([581a84a](https://github.com/benwainwright/tnm/commit/581a84a9402c2431e716b3b5a43aba693977cc55))

### [1.0.2](https://github.com/benwainwright/tnm/compare/v1.0.1...v1.0.2) (2021-08-18)


### Bug Fixes

* backend and frontend were temporarily mismatched ([9de92dc](https://github.com/benwainwright/tnm/commit/9de92dc1571cd302676388dfcfce094f9d42a437))

### [1.0.1](https://github.com/benwainwright/tnm/compare/v1.0.0...v1.0.1) (2021-08-18)


### Bug Fixes

* customers and recipes should no longer be duplicating themselves mysteriously ([dd28e67](https://github.com/benwainwright/tnm/commit/dd28e6767cac4fefef41816416600b84c5030d17))

## [1.0.0](https://github.com/benwainwright/tnm/compare/...v1.0.0) (2021-08-18)


### Features

* added spacing in changelog entries ([55d47a7](https://github.com/benwainwright/tnm/commit/55d47a7532ce10b097f2a0418af5df0250164256))
* automatically change TRELLO-123 to Trello links ([715ba33](https://github.com/benwainwright/tnm/commit/715ba3393932733feea6a352eda9bc410b2890d9))
* capitalise the first letter of changelog entries ([32414d4](https://github.com/benwainwright/tnm/commit/32414d4a9b0fb14d3dc4c15e199bc0d9432f72c9))
* format the changelog date in words ([2c702f5](https://github.com/benwainwright/tnm/commit/2c702f5e0372a355aeb236b14900c9988f2ef40a))
* moved numbers to reports page and added autogenerate changelog to homepage ([7149321](https://github.com/benwainwright/tnm/commit/7149321a1a30b0ad139caec4696dc61c26804820))


### Bug Fixes

* fixed issue with the build by upgrading dependencies to the latest versions ([fc14cf8](https://github.com/benwainwright/tnm/commit/fc14cf851e45151c4ae2dfeb43e5f13852c97909))
* fixed unable to login because of Amplify not accepting configuration ([37c5ac9](https://github.com/benwainwright/tnm/commit/37c5ac9fc88a30f0cdf8805a1bf3cd68bd264496))
