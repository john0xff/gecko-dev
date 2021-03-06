function repeat(limit, func) {
  for (let i = 0; i < limit; i++) {
    func(i);
  }
}

function* promiseAutoComplete(inputText) {
  gURLBar.focus();
  gURLBar.value = inputText.slice(0, -1);
  EventUtils.synthesizeKey(inputText.slice(-1), {});
  yield promiseSearchComplete();
}

function is_selected(index) {
  is(gURLBar.popup.richlistbox.selectedIndex, index, `Item ${index + 1} should be selected`);
}

add_task(function*() {
  registerCleanupFunction(() => PlacesTestUtils.clearHistory());

  yield PlacesTestUtils.clearHistory();
  let tabCount = gBrowser.tabs.length;

  let visits = [];
  repeat(10, i => {
    visits.push({
      uri: makeURI("http://example.com/autocomplete/?" + i),
    });
  });
  yield PlacesTestUtils.addVisits(visits);

  Services.prefs.setBoolPref("browser.urlbar.unifiedcomplete", true);
  yield* do_test();
  Services.prefs.setBoolPref("browser.urlbar.unifiedcomplete", false);
  yield* do_test();
  Services.prefs.clearUserPref("browser.urlbar.unifiedcomplete");
});

function* do_test() {
  gBrowser.selectedTab = gBrowser.addTab("about:blank");
  yield promiseAutoComplete("http://example.com/autocomplete/");

  let popup = gURLBar.popup;
  let results = popup.richlistbox.children;
  is(results.length, 11, "Should get 11 results");

  let initiallySelected = gURLBar.popup.richlistbox.selectedIndex;

  info("Key Down to select the next item");
  EventUtils.synthesizeKey("VK_DOWN", {});
  is_selected(initiallySelected + 1);
  let expectedURL = gURLBar.controller.getFinalCompleteValueAt(initiallySelected + 1);

  is(gURLBar.value, gURLBar.controller.getValueAt(initiallySelected + 1),
     "Value in the URL bar should be updated by keyboard selection");

  // Verify that what we're about to do changes the selectedIndex:
  isnot(initiallySelected + 1, 3, "Shouldn't be changing the selectedIndex to the same index we keyboard-selected.");

  // Would love to use a synthetic mousemove event here, but that doesn't seem to do anything.
  // EventUtils.synthesizeMouseAtCenter(results[3], {type: "mousemove"});
  gURLBar.popup.richlistbox.selectedIndex = 3;
  is_selected(3);

  let autocompletePopupHidden = promisePopupHidden(gURLBar.popup);
  let openedExpectedPage = waitForDocLoadAndStopIt(expectedURL);
  EventUtils.synthesizeKey("VK_RETURN", {});
  yield Promise.all([autocompletePopupHidden, openedExpectedPage]);

  gBrowser.removeCurrentTab();
}
