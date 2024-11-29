## [3.0.2](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v3.0.1...v3.0.2) (2024-11-29)


### Performance Improvements

* **github-actions:** refactor CI workflow ([8f4911a](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/8f4911a44bdefa6b3ad4064d438259b50a16aa12))


### Other Updates

* **github-actions:** check changes in npm dependencies on PR ([2b9daab](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/2b9daab0f3c85c524af587b73b67ce8c409c61bf))
* **github-actions:** disable `fail-fast` for test job matirx ([d1f39af](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/d1f39af612ebfbce3d68b1f38c2cc344a0cfeb5f))
* **github-actions:** optimize commitlint workflow ([1a8aa68](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/1a8aa68b6cb899a329acb8b6579a05fe1a57da01))
* **github-actions:** optimize tests workflow - use cache for dist ([864c677](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/864c67756c0e992c4662dfc9959112bb9f7ab4d3))
* **github-actions:** optimize tests workflow speed by cache ([6bc550a](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/6bc550a7d8218095da3765d187af1787d4469fb4))
* **github-actions:** refactor tests workflow ([1509f5e](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/1509f5e03567508e68670b6b1736c420ba724da3))
* **github-actions:** refactor tests workflow for one build - multiple tests ([10c6753](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/10c6753cf809920a4a67a1f725c919b1136b6170))
* **github-actions:** set NPM environment for deployment workflow ([423d9cc](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/423d9ccc95bd6235ab913a32e9b4eb8a2a04ce61))

## [3.0.1](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v3.0.0...v3.0.1) (2024-11-26)


### Bug Fixes

* add API manual generator ([4120420](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/41204203fa89a02c9578b26356a938301ebdafe6)), closes [#17](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/17)


### Other Updates

* add API docs updating to GitHub workflow ([b7d8e12](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/b7d8e127d10443d2559fe76b1da16bd070197e50)), closes [#17](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/17)
* **deps:** bump @arethetypeswrong/cli from 0.16.4 to 0.17.0 ([2b5d645](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/2b5d6457a6bd749834a6911b507874b14d47ce42))
* **deps:** bump eslint-plugin-tsdoc from 0.3.0 to 0.4.0 ([88f3361](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/88f3361bbabf034b37c6e8e388b2a3f9e135dbe5))
* **deps:** restore Dependabot ([28122b1](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/28122b145659afb0e7aca80823ed14aed406ab1a))
* **github-actions:** publish coverage info ([1470bde](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/1470bdeda14486d6337bee2cb3268b3002e32e59)), closes [#34](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/34)
* **github-actions:** publish tests resuls to GitHub ([099c3da](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/099c3da4a8a219f69b87ef9219737a0917a7155a)), closes [#33](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/33)
* **github-actions:** restore deployment workflow autorun ([b62122e](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/b62122eebd133d245a91d6686eee5c18ec18a869))

## [3.0.0](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v2.1.0...v3.0.0) (2024-11-24)


### ⚠ BREAKING CHANGES

* **plugin:** 

### Features

* **plugin:** move `intermediate` to separate entrypoint ([6ded533](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/6ded533db1efdc8bcd8601aa46860b44b65e03c0)), closes [#29](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/29)


### Other Updates

* **github-actions:** add manual running ability for deployment workflow ([bfa136e](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/bfa136e4600eb3fcbf0345d583f464bb81ea280c))
* simplify module path in tests ([a5ccb9d](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/a5ccb9d958134f8ae52afdf5d0daf94212b160b1)), closes [#28](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/28)
* simplify package path in tests and examples ([fc01db8](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/fc01db8830bffba51fab77a84ed1ed0794ff7b11)), closes [#28](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/28)

## [2.1.0](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v2.0.0...v2.1.0) (2024-11-23)


### Features

* **plugin:** add support for PromiseLike process ([386d905](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/386d90502bd71de8f10f32056b407ec12443dd86)), closes [#22](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/22)

## [2.0.0](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v1.0.3...v2.0.0) (2024-11-23)


### ⚠ BREAKING CHANGES

* **plugin:** change `intermediate2` arguments positions
  (process - first, options - second)

### Features

* **plugin:** add `intermediate` old interface ([d65df3c](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/d65df3c1d3f93d29cb4d9defd60adcb389a6df6f))
* **plugin:** move deprecated interface to intermediate namespace ([711b1be](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/711b1be4a5284bcc9262965f33fa697bd2b8ab2c))


### Bug Fixes

* **plugin:** fix eslint config, errors and warnings ([0096f46](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/0096f46bbc78609690335cc9ef76d8061d9d4461))
* **plugin:** fix gulp-intermediate incompatibility ([953bd43](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/953bd43587b0b4bf982913fafe0884b4463d5ea6)), closes [#21](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/21)


### Other Updates

* add binary files copying example ([8493c66](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/8493c66fef0bc2bbb1b5e652912204a63d77cb97)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* add eslint plugin for vitest ([bcaacdb](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/bcaacdb5317aa6ed6c73a21f6455306a638d8046))
* add example gulpfile.ts for deprecated interface ([758f033](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/758f033c2ea0dbc3c712dc00509582fe57509167)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* add simple copy files example without options ([b5670bb](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/b5670bb204aae386809f3bccaf794d5bca946b81)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* add streaming mode support example ([e280007](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/e280007269a98e2bb033cababe5bf94fcc66b73c)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* add temp dirs cleanup assertions ([02565f8](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/02565f8ad5697d4ebd4865cad5d8b4ee5c447087)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* enable TSDoc eslint plugin ([0dfaa38](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/0dfaa3893b02de7c5d9d49fce80e03d186dc8413))
* fix examples testing with gulp tasks execution ([e508ef8](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/e508ef8ea14e3ff0a323409274906ea1905dc9b5)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* fix tests for parallel execution ([a6b0a23](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/a6b0a234247ade014761bf43241a570dc553628b)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* **github-actions:** add GitHub action reporter for Vitest ([fa8cbb9](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/fa8cbb968427eb9038188e46080b8d2592f517c3))
* **github-actions:** fix deployment workflow ([16c3dcb](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/16c3dcb6098d6f772460f758be2686760b8494b5))
* **github-actions:** rename commitlint workflow ([8b4059a](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/8b4059a4aafe85aacf5acbbdc49a0ba1c8a6f5d5))
* **github-actions:** run tests workflow just if sources changed ([afe017b](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/afe017b726a54b8f41f6b1d557e58dc517828688))
* **plugin:** rewrite TSDoc comments ([aa399bc](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/aa399bc2d526619b02720bf0929986656d77e25a))
* refactor test for old interface ([2bb1a02](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/2bb1a023928aed00a6d00e1b346f90dd8ddec062)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* refactor to more readable compatible mode examples ([f76d8b6](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/f76d8b6867e8b4d9504ede4f33d0ff8a3ebd4193)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* remove unexpected tests ([e241b08](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/e241b088c19fd11056b25048bd98db68cc7c9064)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* update code examples in readme from .ts files ([bc33623](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/bc33623f604586ad200d2c2c1f6f941322e28c2b)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)
* use remark for readme.md updating ([c5f0f1a](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/c5f0f1a03420f830bed9845da765ed111420777d)), closes [#15](https://github.com/IT-Service-NPM/gulp-intermediate2/issues/15)

## [1.0.3](https://github.com/IT-Service-NPM/gulp-intermediate2/compare/v1.0.2...v1.0.3) (2024-11-05)


### Bug Fixes

* **plugin:** fix package repository links and readme ([600171b](https://github.com/IT-Service-NPM/gulp-intermediate2/commit/600171b813c70013e1ab0ec3d259109cdcd4b9b7))

## [1.0.2](https://github.com/IT-Service/gulp-intermediate2/compare/v1.0.1...v1.0.2) (2024-11-05)


### Bug Fixes

* fix package version ([936e371](https://github.com/IT-Service/gulp-intermediate2/commit/936e3713bd270d4cda46bad88f4eb73cc7903dc7))

## 1.0.0 (2024-11-05)


### Features

* **plugin:** :sparkles: Refactor gulp-intermediate for fully support vinyl-fs src options ([865d86f](https://github.com/IT-Service/gulp-intermediate2/commit/865d86f67d5af0402cf7455b43fea0e0cac40cf4)), closes [#3](https://github.com/IT-Service/gulp-intermediate2/issues/3)


### Bug Fixes

* **plugin:** :bug: remove temp dir even if streaming mode used ([d54276b](https://github.com/IT-Service/gulp-intermediate2/commit/d54276b130f886d194e3b2f6cde3330d1b97ed35)), closes [#3](https://github.com/IT-Service/gulp-intermediate2/issues/3)
* **plugin:** :bug: temp dir must be deleted even if process failed ([277c6ea](https://github.com/IT-Service/gulp-intermediate2/commit/277c6ea14fd284e2e0023355e94be3664b1d2328))


### Other Updates

* :construction_worker: add code coverage calculation ([ceb7b8d](https://github.com/IT-Service/gulp-intermediate2/commit/ceb7b8d4dc3709ef3a2f414c7f6193359e2d4b8b)), closes [#4](https://github.com/IT-Service/gulp-intermediate2/issues/4)
* :construction_worker: add coverage report to CI workflow ([392a981](https://github.com/IT-Service/gulp-intermediate2/commit/392a981b965e14120a93094087f6c6042eb7188b)), closes [#4](https://github.com/IT-Service/gulp-intermediate2/issues/4)
* :construction_worker: add deployment workflow ([d210743](https://github.com/IT-Service/gulp-intermediate2/commit/d210743d366101869e60d46a6b91ba9ad1477be4))
* :construction_worker: enable CI workflow for all branches ([8542bba](https://github.com/IT-Service/gulp-intermediate2/commit/8542bbafd91e2e203cbc781d6e4ee547c9e2d09b))
* :white_check_mark: add tests matrix for os and Node versions ([c68e1ca](https://github.com/IT-Service/gulp-intermediate2/commit/c68e1caa6dbd75b10e21819cc0af0f2686371c9f))
* :white_check_mark: fix test incompatibility with new process semantic ([5959ab8](https://github.com/IT-Service/gulp-intermediate2/commit/5959ab87e5020ab6c91e8874e6669934af041f3c))
* **changelog:** add changelog generator ([365b9f2](https://github.com/IT-Service/gulp-intermediate2/commit/365b9f2130b51c1ad4e290ce240ebca5453dc235)), closes [#2](https://github.com/IT-Service/gulp-intermediate2/issues/2)
* **deps:** bump @types/plugin-error from 0.1.1 to 1.0.0 ([4b3a50b](https://github.com/IT-Service/gulp-intermediate2/commit/4b3a50bf9b08e45f83765a3d885f0af868086bb0))
* **deps:** bump eslint from 9.13.0 to 9.14.0 ([d232067](https://github.com/IT-Service/gulp-intermediate2/commit/d23206780bde3bf48aff43c3ce2d89c5ac13dfbe))
* **deps:** bump nanoid from 5.0.7 to 5.0.8 ([b024c98](https://github.com/IT-Service/gulp-intermediate2/commit/b024c9873b749c167ac990c20bd2b804ad84078c))
* **deps:** bump plugin-error from 1.0.1 to 2.0.1 ([400ea66](https://github.com/IT-Service/gulp-intermediate2/commit/400ea6619299768b50bf714c36ad8a56605e751a))
* **deps:** bump tsup from 8.3.0 to 8.3.5 ([d35aee6](https://github.com/IT-Service/gulp-intermediate2/commit/d35aee69ef2b5c54bf4eb117e326ca4c446a378f))
* **deps:** bump typescript from 5.6.2 to 5.6.3 ([4712946](https://github.com/IT-Service/gulp-intermediate2/commit/4712946c61aaa304a5d3a142eca4aa0fb067ee97))
* fix semantic-release configuration ([66f3e62](https://github.com/IT-Service/gulp-intermediate2/commit/66f3e62bf669e99c8d9cf68c35991c08234a1e0b))
* **github-actions:** add commitlint workflow ([5d860ed](https://github.com/IT-Service/gulp-intermediate2/commit/5d860ed4091fe996c06768de4e6bb97f2245970f))
* **plugin:** :white_check_mark: fix test compatibility with linux OS ([0f3b6a2](https://github.com/IT-Service/gulp-intermediate2/commit/0f3b6a2f1f7a2a48fee67b9b5144a65f650557ce))
