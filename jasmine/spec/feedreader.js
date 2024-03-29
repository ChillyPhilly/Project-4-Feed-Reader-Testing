/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have non-empty URLs', function() {
      allFeeds.forEach(function(item) {
        expect(item.url).toBeDefined();
        expect(typeof item.url).toBe('string');
        expect(item.url).toContain('http://');
        expect(item.url).not.toBe('');
      });
    });


    /* Loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have names defined', function() {
      allFeeds.forEach(function(item) {
        expect(item.name).toBeDefined();
        expect(typeof item.name).toBe('string');
        expect(item.name).not.toBe('');
      });
    });
  });


  /* Test suite for "The menu" */
  describe('The menu', function() {
    const menu = document.querySelector('.slide-menu'),
      body = document.querySelector('body'),
      menuIcon = document.querySelector('.menu-icon-link');
    /* Ensures the menu element is
     * hidden by default.
     */
    it('is hidden by default', function() {
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    /* Ensures the menu changes
     * visibility when the menu icon is clicked. Makes sure
     * the menu displays when clicked and hides when clicked again.
     * Independent of "is hidden by default".
     */
    it('changes visibility when menu icon is clicked', function() {
      const spyEvent = spyOnEvent(menuIcon, 'click');

      // If statements to make sure this is independent of the menu
      // being "Hidden by default".
      if (body.classList.contains('menu-hidden')) {
        $((menuIcon).click());
        expect(body.classList.contains('menu-hidden')).toBe(false);
        $((menuIcon).click());
        expect(body.classList.contains('menu-hidden')).toBe(true);
      } else if (!body.classList.contains('menu-hidden')) {
        $((menuIcon).click());
        expect(body.classList.contains('menu-hidden')).toBe(true);
        $((menuIcon).click());
        expect(body.classList.contains('menu-hidden')).toBe(false);
      }
    });
  });

  /* Test suite for "Initial Entries" */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* Ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('has at least one element in the feed', function(done) {
      const feedChildren = $('.feed .entry');

      expect(feedChildren.length).toBeGreaterThan(0);
      done();
    });
  });

  /* Test suite for "New Feed Selection" */
  describe('New Feed Selection', function() {
    let oldFeed, newFeed;

    //Loads feed 0 and feed 1 asynchronously, and feeds this back
    //so that the oldFeed and newFeed can be compared
    beforeEach(function(done) {
      loadFeed(0, function() {
        oldFeed = $('.feed').html();
        loadFeed(1, function() {
          newFeed = $('.feed').html();
          done();
        });
      });
    });

  /* Ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   */
   it('changes content when a new feed is selected', function() {
     expect(oldFeed).not.toBe(newFeed);
   });
 });
}());
