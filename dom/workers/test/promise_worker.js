function ok(a, msg) {
  dump("OK: " + !!a + "  =>  " + a + " " + msg + "\n");
  postMessage({type: 'status', status: !!a, msg: a + ": " + msg });
}

function is(a, b, msg) {
  dump("IS: " + (a===b) + "  =>  " + a + " | " + b + " " + msg + "\n");
  postMessage({type: 'status', status: a === b, msg: a + " === " + b + ": " + msg });
}

function isnot(a, b, msg) {
  dump("ISNOT: " + (a!==b) + "  =>  " + a + " | " + b + " " + msg + "\n");
  postMessage({type: 'status', status: a !== b, msg: a + " !== " + b + ": " + msg });
}

function promiseResolve() {
  ok(Promise, "Promise object should exist");

  var promise = new Promise(function(resolve, reject) {
    ok(resolve, "Promise.resolve exists");
    ok(reject, "Promise.reject exists");

    resolve(42);
  }).then(function(what) {
    ok(true, "Then - resolveCb has been called");
    is(what, 42, "ResolveCb received 42");
    runTest();
  }, function() {
    ok(false, "Then - rejectCb has been called");
    runTest();
  });
}


function promiseReject() {
  var promise = new Promise(function(resolve, reject) {
    reject(42);
  }).then(function(what) {
    ok(false, "Then - resolveCb has been called");
    runTest();
  }, function(what) {
    ok(true, "Then - rejectCb has been called");
    is(what, 42, "RejectCb received 42");
    runTest();
  });
}

function promiseException() {
  var promise = new Promise(function(resolve, reject) {
    throw 42;
  }).then(function(what) {
    ok(false, "Then - resolveCb has been called");
    runTest();
  }, function(what) {
    ok(true, "Then - rejectCb has been called");
    is(what, 42, "RejectCb received 42");
    runTest();
  });
}

function promiseAsync() {
  var global = "foo";
  var f = new Promise(function(r1, r2) {
    is(global, "foo", "Global should be foo");
    r1(42);
    is(global, "foo", "Global should still be foo");
    setTimeout(function() {
      is(global, "bar", "Global should still be bar!");
      runTest();
    }, 0);
  }).then(function() {
    global = "bar";
  });
  is(global, "foo", "Global should still be foo (2)");
}

function promiseDoubleThen() {
  var steps = 0;
  var promise = new Promise(function(r1, r2) {
    r1(42);
  });

  promise.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 42, "Value == 42");
    steps++;
  }, function(what) {
    ok(false, "Then.reject has been called");
  });

  promise.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(steps, 1, "Then.resolve - step == 1");
    is(what, 42, "Value == 42");
    runTest();
  }, function(what) {
    ok(false, "Then.reject has been called");
  });
}

function promiseThenException() {
  var promise = new Promise(function(resolve, reject) {
    resolve(42);
  });

  promise.then(function(what) {
    ok(true, "Then.resolve has been called");
    throw "booh";
  }).catch(function(e) {
    ok(true, "Catch has been called!");
    runTest();
  });
}

function promiseThenCatchThen() {
  var promise = new Promise(function(resolve, reject) {
    resolve(42);
  });

  var promise2 = promise.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 42, "Value == 42");
    return what + 1;
  }, function(what) {
    ok(false, "Then.reject has been called");
  });

  isnot(promise, promise2, "These 2 promise objs are different");

  promise2.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 43, "Value == 43");
    return what + 1;
  }, function(what) {
    ok(false, "Then.reject has been called");
  }).catch(function() {
    ok(false, "Catch has been called");
  }).then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 44, "Value == 44");
    runTest();
  }, function(what) {
    ok(false, "Then.reject has been called");
  });
}

function promiseRejectThenCatchThen() {
  var promise = new Promise(function(resolve, reject) {
    reject(42);
  });

  var promise2 = promise.then(function(what) {
    ok(false, "Then.resolve has been called");
  }, function(what) {
    ok(true, "Then.reject has been called");
    is(what, 42, "Value == 42");
    return what + 1;
  });

  isnot(promise, promise2, "These 2 promise objs are different");

  promise2.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 43, "Value == 43");
    return what+1;
  }).catch(function(what) {
    ok(false, "Catch has been called");
  }).then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 44, "Value == 44");
    runTest();
  });
}

function promiseRejectThenCatchThen2() {
  var promise = new Promise(function(resolve, reject) {
    reject(42);
  });

  promise.then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 42, "Value == 42");
    return what+1;
  }).catch(function(what) {
    is(what, 42, "Value == 42");
    ok(true, "Catch has been called");
    return what+1;
  }).then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 43, "Value == 43");
    runTest();
  });
}

function promiseRejectThenCatchExceptionThen() {
  var promise = new Promise(function(resolve, reject) {
    reject(42);
  });

  promise.then(function(what) {
    ok(false, "Then.resolve has been called");
  }, function(what) {
    ok(true, "Then.reject has been called");
    is(what, 42, "Value == 42");
    throw(what + 1);
  }).catch(function(what) {
    ok(true, "Catch has been called");
    is(what, 43, "Value == 43");
    return what + 1;
  }).then(function(what) {
    ok(true, "Then.resolve has been called");
    is(what, 44, "Value == 44");
    runTest();
  });
}

function promiseThenCatchOrderingResolve() {
  var global = 0;
  var f = new Promise(function(r1, r2) {
    r1(42);
  });

  f.then(function() {
    f.then(function() {
      global++;
    });
    f.catch(function() {
      global++;
    });
    f.then(function() {
      global++;
    });
    setTimeout(function() {
      is(global, 2, "Many steps... should return 2");
      runTest();
    }, 0);
  });
}

function promiseThenCatchOrderingReject() {
  var global = 0;
  var f = new Promise(function(r1, r2) {
    r2(42);
  })

  f.then(function() {}, function() {
    f.then(function() {
      global++;
    });
    f.catch(function() {
      global++;
    });
    f.then(function() {}, function() {
      global++;
    });
    setTimeout(function() {
      is(global, 2, "Many steps... should return 2");
      runTest();
    }, 0);
  });
}

function promiseNestedPromise() {
  new Promise(function(resolve, reject) {
    resolve(new Promise(function(resolve, reject) {
      ok(true, "Nested promise is executed");
      resolve(42);
    }));
  }).then(function(value) {
    is(value, 42, "Nested promise is executed and then == 42");
    runTest();
  });
}

function promiseNestedNestedPromise() {
  new Promise(function(resolve, reject) {
    resolve(new Promise(function(resolve, reject) {
      ok(true, "Nested promise is executed");
      resolve(42);
    }).then(function(what) { return what+1; }));
  }).then(function(value) {
    is(value, 43, "Nested promise is executed and then == 43");
    runTest();
  });
}

function promiseWrongNestedPromise() {
  new Promise(function(resolve, reject) {
    resolve(new Promise(function(r, r2) {
      ok(true, "Nested promise is executed");
      r(42);
    }));
    reject(42);
  }).then(function(value) {
    is(value, 42, "Nested promise is executed and then == 42");
    runTest();
  }, function(value) {
     ok(false, "This is wrong");
  });
}

function promiseLoop() {
  new Promise(function(resolve, reject) {
    resolve(new Promise(function(r1, r2) {
      ok(true, "Nested promise is executed");
      r1(new Promise(function(r1, r2) {
        ok(true, "Nested nested promise is executed");
        r1(42);
      }));
    }));
  }).then(function(value) {
    is(value, 42, "Nested nested promise is executed and then == 42");
    runTest();
  }, function(value) {
     ok(false, "This is wrong");
  });
}

function promiseStaticReject() {
  var promise = Promise.reject(42).then(function(what) {
    ok(false, "This should not be called");
  }, function(what) {
    is(what, 42, "Value == 42");
    runTest();
  });
}

function promiseStaticResolve() {
  var promise = Promise.resolve(42).then(function(what) {
    is(what, 42, "Value == 42");
    runTest();
  }, function() {
    ok(false, "This should not be called");
  });
}

function promiseResolveNestedPromise() {
  var promise = Promise.resolve(new Promise(function(r, r2) {
    ok(true, "Nested promise is executed");
    r(42);
  }, function() {
    ok(false, "This should not be called");
  })).then(function(what) {
    is(what, 42, "Value == 42");
    runTest();
  }, function() {
    ok(false, "This should not be called");
  });
}

function promiseRejectNoHandler() {
  // This test only checks that the code that reports unhandled errors in the
  // Promises implementation does not crash or leak.
  var promise = new Promise(function(res, rej) {
    noSuchMethod();
  });
  runTest();
}

var tests = [
    promiseResolve,
    promiseReject,
    promiseException,
    promiseAsync,
    promiseDoubleThen,
    promiseThenException,
    promiseThenCatchThen,
    promiseRejectThenCatchThen,
    promiseRejectThenCatchThen2,
    promiseRejectThenCatchExceptionThen,
    promiseThenCatchOrderingResolve,
    promiseThenCatchOrderingReject,
    promiseNestedPromise,
    promiseNestedNestedPromise,
    promiseWrongNestedPromise,
    promiseLoop,
    promiseStaticReject,
    promiseStaticResolve,
    promiseResolveNestedPromise,
    promiseRejectNoHandler,
];

function runTest() {
  if (!tests.length) {
    postMessage({ type: 'finish' });
    return;
  }

  var test = tests.shift();
  test();
}

onmessage = function() {
  runTest();
}
