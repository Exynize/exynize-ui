# Changelog

0.8.0 / 2016-02-22
==================

  * hide pipeline actions from non-owners
  * public pipeline results support

0.7.0 / 2016-02-22
==================

  * correctly handle empty errors and errors during pipeline testing
  * add basic intro to login screen
  * correctly detect source component type using routeHandler export

0.6.1 / 2016-02-18
==================

  * update documentation and tutorial links

0.6.0 / 2016-02-18
==================

  * add basic documentation and tutorials

0.5.0 / 2016-02-12
==================

  * add delete pipeline functionality
  * add delete component functionality
  * upgrade to react-router 2.0 and http-proxy 0.10
  * fix pagination bug on component count change in component selector

0.4.0 / 2016-01-28
==================

New features:
  * allow editing public status of pipelines
  * display pipeline public status in catalogue
  * use new urls for pipeline results
  * better component selection in pipeline editor
  * use status socket to dynamically show pipeline status
  * add better component selector component
  * better registration form
  * better login form
  * better ui layout for pipelines catalogue
  * allow editing pipelines by username and refName
  * allow referencing and editing components using username and refname
  * add username support during registration, adjust layout for auth forms
  * replace bootstrap material with bootswatch paper
  * new component editor layout
  * enable hot reload for dev mode

Fixes and minor tweaks:
  * show message when no pipelines found
  * fix error when user have not entered params
  * fix initial pipeline loading
  * merge pipeline status manually
  * fix pipeline editing
  * use react-json-tree for pipeline test result rendering
  * use react-json-tree for component test result rendering
  * fix log display and use react-json-tree for log data render
  * hide test button when pipeline test is running
  * hide test button when component test is running
  * fix new component creation and adjust read-only component layout
  * correctly display non-owned components
  * fix issue with pipeline status update
  * correctly handle component pagination with search
  * send component id during test for private source fetching
  * unify component renderer
  * temporary fix for react-hmr issue
  * correctly handle pipeline changes
  * use babel preset for hot-reload
  * fix component update function
  * reset test results on component change
  * fix default state init for stores
  * correctly reset component id when creating new component
  * fix new component creation when component view is already opened
  * fix issue with component reset on test
  * adjust styling for admin page
  * correct id and ref for pass
  * fix issue with auth initial state
  * slimmer page headers
  * adjust pipeline editor layout
  * move pipeline creation to new component
  * remove unneeded history stuff since we now user component urls
  * better components catalogue + only allow edit of owned components
  * allow changing components public/private props
  * fix state props naming for component editor
  * more defaults for new components
  * fix component editing
  * adjust admin panel layout
  * adjust catalogues layout
  * adjust pipeline creation ui layout
  * allow specifying component versions
  * move component editor to a separate react component, allow running multiple tests simultaneously
  * update dependency versions

0.3.0 / 2015-12-16
==================

  * change from access request to plain registration

v0.2.0 / 2015-12-15
===================

  * fix license field format in package.json & format license as markdown
  * deploy in docker using express.js and proxy requests to rest api internally
  * better error checking for webpack build
  * fix license text

v0.1.0 / 2015-12-14
===================

  * first commit for open source version
