// // const $ = str => document.querySelector(str);
// // const $$ = str => document.querySelectorAll(str);

// // // const carousel = document.getElementById('carousel');

// // // carousel.addEventListener('mousedown', () => {
// // //   carousel.classList.add('dragging');
// // // });

// // // document.addEventListener('mouseup', () => {
// // //   carousel.classList.remove('dragging');
// // // });

// // (function() {
// //     if (!window.app) {
// //         window.app = {};
// //     }
// //     app.carousel = {
// //         removeClass: function(el, classname='') {
// //             if (el) {
// //                 if (classname === '') {
// //                     el.className = '';
// //                 } else {
// //                     el.classList.remove(classname);
// //                 }
// //                 return el;
// //             }
// //             return;
// //         },
// //         reorder: function() {
// //             let childcnt = $("#carousel").children.length;
// //             let childs = $("#carousel").children;

// //             for (let j=0; j< childcnt; j++) {
// //                 childs[j].dataset.pos = j;
// //             }
// //         },
// //         move: function(el) {
// //             let selected = el;

// //             if (typeof el === "string") {
// //             console.log(`got string: ${el}`);
// //                 selected = (el == "next") ? $(".selected").nextElementSibling : $(".selected").previousElementSibling;
// //                 console.dir(selected);
// //             }

// //             let curpos = parseInt(app.selected.dataset.pos);
// //             let tgtpos = parseInt(selected.dataset.pos);

// //             let cnt = curpos - tgtpos;
// //             let dir = (cnt < 0) ? -1 : 1;
// //             let shift = Math.abs(cnt);

// //             for (let i=0; i<shift; i++) {
// //                 let el = (dir == -1) ? $("#carousel").firstElementChild : $("#carousel").lastElementChild;

// //                 if (dir == -1) {
// //                     el.dataset.pos = $("#carousel").children.length;
// //                     $('#carousel').append(el);
// //                 } else {
// //                     el.dataset.pos = 0;
// //                     $('#carousel').prepend(el);
// //                 }

// //                 app.carousel.reorder();
// //             }


// //             app.selected = selected;
// //             let next = selected.nextElementSibling;// ? selected.nextElementSibling : selected.parentElement.firstElementChild;
// //             var prev = selected.previousElementSibling; // ? selected.previousElementSibling : selected.parentElement.lastElementChild;
// //             var prevSecond = prev ? prev.previousElementSibling : selected.parentElement.lastElementChild;
// //             var nextSecond = next ? next.nextElementSibling : selected.parentElement.firstElementChild;

// //             selected.className = '';
// //             selected.classList.add("selected");

// //             // app.carousel.removeClass(prev).classList.add('prev');
// //             app.carousel.removeClass(prev).classList.add('hideLeft');
// //             app.carousel.removeClass(next).classList.add('next');

// //             app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
// //             // app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");

// //             app.carousel.nextAll(nextSecond).forEach(item=>{ item.className = ''; item.classList.add('hideRight') });
// //             app.carousel.prevAll(prevSecond).forEach(item=>{ item.className = ''; item.classList.add('hideLeft') });

// //         },
// //         nextAll: function(el) {
// //             let els = [];

// //             if (el) {
// //                 while (el = el.nextElementSibling) { els.push(el); }
// //             }

// //             return els;

// //         },
// //         prevAll: function(el) {
// //             let els = [];

// //             if (el) {
// //                 while (el = el.previousElementSibling) { els.push(el); }
// //             }


// //             return els;
// //         },
// //         keypress: function(e) {
// //             switch (e.which) {
// //                 case 37: // left
// //                     app.carousel.move('prev');
// //                     break;

// //                 case 39: // right
// //                     app.carousel.move('next');
// //                     break;

// //                 default:
// //                     return;
// //             }
// //             e.preventDefault();
// //             return false;
// //         },
// //         select: function(e) {
// //         console.log(`select: ${e}`);
// //             let tgt = e.target;
// //             while (!tgt.parentElement.classList.contains('carousel')) {
// //                 tgt = tgt.parentElement;
// //             }

// //             app.carousel.move(tgt);

// //         },
// //         previous: function(e) {
// //             app.carousel.move('prev');
// //         },
// //         next: function(e) {
// //             app.carousel.move('next');
// //         },
// //         doDown: function(e) {
// //         console.log(`down: ${e.x}`);
// //             app.carousel.state.downX = e.x;
// //         },
// //         doUp: function(e) {
// //         console.log(`up: ${e.x}`);
// //             let direction = 0,
// //                 velocity = 0;

// //             if (app.carousel.state.downX) {
// //                 direction = (app.carousel.state.downX > e.x) ? -1 : 1;
// //                 velocity = app.carousel.state.downX - e.x;

// //                 if (Math.abs(app.carousel.state.downX - e.x) < 10) {
// //                     app.carousel.select(e);
// //                     return false;
// //                 }
// //                 if (direction === -1) {
// //                     app.carousel.move('next');
// //                 } else {
// //                     app.carousel.move('prev');
// //                 }
// //                 app.carousel.state.downX = 0;
// //             }
// //         },

// //             init: function() {
// //                 document.addEventListener("keydown", app.carousel.keypress);
// //             // $('#carousel').addEventListener("click", app.carousel.select, true);
// //                 $("#carousel").addEventListener("mousedown", app.carousel.doDown);
// //                 $("#carousel").addEventListener("touchstart", app.carousel.doDown);
// //                 $("#carousel").addEventListener("mouseup", app.carousel.doUp);
// //                 $("#carousel").addEventListener("touchend", app.carousel.doup);

// //                 app.carousel.reorder();
// //                 $('#prev').addEventListener("click", app.carousel.previous);
// //                 $('#next').addEventListener("click", app.carousel.next);
// //                 app.selected = $(".selected");

// //                 const selected = app.selected;
// //                 const prev = selected.previousElementSibling;
// //                 const prevSecond = prev ? prev.previousElementSibling : null;

// //                 if (prev) {
// //                     app.carousel.removeClass(prev).classList.add('hideLeft');
// //                 }
// //                 if (prevSecond) {
// //                     app.carousel.removeClass(prevSecond).classList.add('hideLeft');
// //                 }
// //                 app.carousel.prevAll(prevSecond).forEach(item => {
// //                 item.className = '';
// //                 item.classList.add('hideLeft');
// //             });

// //         },
// //         state: {}

// //     }
// //     app.carousel.init();
// // })();

// const $ = str => document.querySelector(str);
// const $$ = str => document.querySelectorAll(str);

// (function() {
//     if (!window.app) {
//         window.app = {};
//     }
//     app.carousel = {
//         removeClass: function(el, classname='') {
//             if (el) {
//                 if (classname === '') {
//                     el.className = '';
//                 } else {
//                     el.classList.remove(classname);
//                 }
//                 return el;
//             }
//             return;
//         },
//         reorder: function() {
//             let childcnt = $("#carousel").children.length;
//             let childs = $("#carousel").children;

//             for (let j=0; j< childcnt; j++) {
//                 childs[j].dataset.pos = j;
//             }
//         },
//         move: function(el) {
//             let selected = el;

//             if (typeof el === "string") {
//                 selected = (el == "next") ? $(".selected").nextElementSibling : $(".selected").previousElementSibling;
//             }

//             let curpos = parseInt(app.selected.dataset.pos);
//             let tgtpos = parseInt(selected.dataset.pos);

//             let cnt = curpos - tgtpos;
//             let dir = (cnt < 0) ? -1 : 1;
//             let shift = Math.abs(cnt);

//             for (let i=0; i<shift; i++) {
//                 let el = (dir == -1) ? $("#carousel").firstElementChild : $("#carousel").lastElementChild;

//                 if (dir == -1) {
//                     el.dataset.pos = $("#carousel").children.length;
//                     $('#carousel').append(el);
//                 } else {
//                     el.dataset.pos = 0;
//                     $('#carousel').prepend(el);
//                 }

//                 app.carousel.reorder();
//             }

//             app.selected = selected;
//             let next = selected.nextElementSibling;
//             var prev = selected.previousElementSibling;
//             var prevSecond = prev ? prev.previousElementSibling : selected.parentElement.lastElementChild;
//             var nextSecond = next ? next.nextElementSibling : selected.parentElement.firstElementChild;

//             selected.className = '';
//             selected.classList.add("selected");

//             app.carousel.removeClass(prev).classList.add('hideLeft');
//             app.carousel.removeClass(next).classList.add('next');

//             app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");

//             app.carousel.nextAll(nextSecond).forEach(item=>{ item.className = ''; item.classList.add('hideRight') });
//             app.carousel.prevAll(prevSecond).forEach(item=>{ item.className = ''; item.classList.add('hideLeft') });
//         },
//         nextAll: function(el) {
//             let els = [];

//             if (el) {
//                 while (el = el.nextElementSibling) { els.push(el); }
//             }

//             return els;
//         },
//         prevAll: function(el) {
//             let els = [];

//             if (el) {
//                 while (el = el.previousElementSibling) { els.push(el); }
//             }

//             return els;
//         },
//         keypress: function(e) {
//             switch (e.which) {
//                 case 37: // left
//                     app.carousel.move('prev');
//                     break;

//                 case 39: // right
//                     app.carousel.move('next');
//                     break;

//                 default:
//                     return;
//             }
//             e.preventDefault();
//             return false;
//         },
//         doDown: function(e) {
//             // Get the correct coordinate for both mouse and touch events
//             const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//             app.carousel.state.downX = clientX;
//             app.carousel.state.startTime = Date.now();
//             app.carousel.state.isDragging = false;
            
//             // Prevent default to avoid text selection and other unwanted behaviors
//             e.preventDefault();
//         },
//         doMove: function(e) {
//             if (app.carousel.state.downX !== undefined) {
//                 const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//                 const diff = Math.abs(app.carousel.state.downX - clientX);
                
//                 // If user has moved more than 5px, consider it a drag
//                 if (diff > 5) {
//                     app.carousel.state.isDragging = true;
//                 }
                
//                 e.preventDefault();
//             }
//         },
//         doUp: function(e) {
//             if (app.carousel.state.downX !== undefined) {
//                 const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//                 const direction = (app.carousel.state.downX > clientX) ? -1 : 1;
//                 const distance = Math.abs(app.carousel.state.downX - clientX);
//                 const timeDiff = Date.now() - app.carousel.state.startTime;
                
//                 // Only trigger movement if it was a drag (not just a click/tap)
//                 // and the distance is significant enough
//                 if (app.carousel.state.isDragging && distance > 30) {
//                     if (direction === -1) {
//                         app.carousel.move('next');
//                     } else {
//                         app.carousel.move('prev');
//                     }
//                 }
                
//                 // Reset state
//                 app.carousel.state.downX = undefined;
//                 app.carousel.state.isDragging = false;
//                 app.carousel.state.startTime = undefined;
                
//                 e.preventDefault();
//             }
//         },
//         init: function() {
//             document.addEventListener("keydown", app.carousel.keypress);
            
//             // Add drag/swipe event listeners
//             $("#carousel").addEventListener("mousedown", app.carousel.doDown);
//             $("#carousel").addEventListener("touchstart", app.carousel.doDown, { passive: false });
            
//             $("#carousel").addEventListener("mousemove", app.carousel.doMove);
//             $("#carousel").addEventListener("touchmove", app.carousel.doMove, { passive: false });
            
//             $("#carousel").addEventListener("mouseup", app.carousel.doUp);
//             $("#carousel").addEventListener("touchend", app.carousel.doUp, { passive: false });
            
//             // Handle mouse leave to reset state if user drags outside
//             $("#carousel").addEventListener("mouseleave", function() {
//                 app.carousel.state.downX = undefined;
//                 app.carousel.state.isDragging = false;
//             });

//             app.carousel.reorder();
//             app.selected = $(".selected");

//             const selected = app.selected;
//             const prev = selected.previousElementSibling;
//             const prevSecond = prev ? prev.previousElementSibling : null;

//             if (prev) {
//                 app.carousel.removeClass(prev).classList.add('hideLeft');
//             }
//             if (prevSecond) {
//                 app.carousel.removeClass(prevSecond).classList.add('hideLeft');
//             }
//             app.carousel.prevAll(prevSecond).forEach(item => {
//                 item.className = '';
//                 item.classList.add('hideLeft');
//             });
//         },
//         state: {}
//     }
//     app.carousel.init();
// })()

const $ = str => document.querySelector(str);
const $$ = str => document.querySelectorAll(str);

(function() {
    if (!window.app) {
        window.app = {};
    }
    app.carousel = {
        removeClass: function(el, classname='') {
            if (el) {
                if (classname === '') {
                    el.className = '';
                } else {
                    el.classList.remove(classname);
                }
                return el;
            }
            return;
        },
        reorder: function() {
            let childcnt = $("#carousel").children.length;
            let childs = $("#carousel").children;

            for (let j=0; j< childcnt; j++) {
                childs[j].dataset.pos = j;
            }
        },
        move: function(el) {
            let selected = el;

            if (typeof el === "string") {
                selected = (el == "next") ? $(".selected").nextElementSibling : $(".selected").previousElementSibling;
            }

            let curpos = parseInt(app.selected.dataset.pos);
            let tgtpos = parseInt(selected.dataset.pos);

            let cnt = curpos - tgtpos;
            let dir = (cnt < 0) ? -1 : 1;
            let shift = Math.abs(cnt);

            for (let i=0; i<shift; i++) {
                let el = (dir == -1) ? $("#carousel").firstElementChild : $("#carousel").lastElementChild;

                if (dir == -1) {
                    el.dataset.pos = $("#carousel").children.length;
                    $('#carousel').append(el);
                } else {
                    el.dataset.pos = 0;
                    $('#carousel').prepend(el);
                }

                app.carousel.reorder();
            }

            app.selected = selected;
            let next = selected.nextElementSibling;
            var prev = selected.previousElementSibling;
            var prevSecond = prev ? prev.previousElementSibling : selected.parentElement.lastElementChild;
            var nextSecond = next ? next.nextElementSibling : selected.parentElement.firstElementChild;

            selected.className = '';
            selected.classList.add("selected");

            app.carousel.removeClass(prev).classList.add('hideLeft');
            app.carousel.removeClass(next).classList.add('next');

            app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");

            app.carousel.nextAll(nextSecond).forEach(item=>{ item.className = ''; item.classList.add('hideRight') });
            app.carousel.prevAll(prevSecond).forEach(item=>{ item.className = ''; item.classList.add('hideLeft') });
        },
        nextAll: function(el) {
            let els = [];

            if (el) {
                while (el = el.nextElementSibling) { els.push(el); }
            }

            return els;
        },
        prevAll: function(el) {
            let els = [];

            if (el) {
                while (el = el.previousElementSibling) { els.push(el); }
            }

            return els;
        },
        keypress: function(e) {
            switch (e.which) {
                case 37: // left
                    app.carousel.move('prev');
                    break;

                case 39: // right
                    app.carousel.move('next');
                    break;

                default:
                    return;
            }
            e.preventDefault();
            return false;
        },
        doDown: function(e) {
            // Get the correct coordinate for both mouse and touch events
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            app.carousel.state.downX = clientX;
            app.carousel.state.downY = clientY;
            app.carousel.state.startTime = Date.now();
            app.carousel.state.isDragging = false;
            app.carousel.state.isHorizontalSwipe = false;
            
            // Add dragging class to prevent text selection
            $("#carousel").classList.add('dragging');
            
            // Clear any existing text selection
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        },
        doMove: function(e) {
            if (app.carousel.state.downX !== undefined && app.carousel.state.downY !== undefined) {
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                const diffX = Math.abs(app.carousel.state.downX - clientX);
                const diffY = Math.abs(app.carousel.state.downY - clientY);
                
                // Determine if this is primarily a horizontal or vertical gesture
                if (diffX > 10 || diffY > 10) {
                    if (diffX > diffY) {
                        // Horizontal swipe detected
                        app.carousel.state.isHorizontalSwipe = true;
                        app.carousel.state.isDragging = true;
                        // Only prevent default for horizontal swipes
                        e.preventDefault();
                        
                        // Clear text selection during drag
                        if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        } else if (document.selection) {
                            document.selection.empty();
                        }
                    }
                    // If it's vertical (diffY > diffX), let the browser handle scrolling
                }
            }
        },
        doUp: function(e) {
            // Always remove dragging class when mouse/touch is released
            $("#carousel").classList.remove('dragging');
            
            if (app.carousel.state.downX !== undefined) {
                const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
                const direction = (app.carousel.state.downX > clientX) ? -1 : 1;
                const distance = Math.abs(app.carousel.state.downX - clientX);
                
                // Only trigger carousel movement if it was a horizontal swipe
                if (app.carousel.state.isHorizontalSwipe && app.carousel.state.isDragging && distance > 30) {
                    if (direction === -1) {
                        app.carousel.move('next');
                    } else {
                        app.carousel.move('prev');
                    }
                    e.preventDefault();
                }
                
                // Reset state
                app.carousel.state.downX = undefined;
                app.carousel.state.downY = undefined;
                app.carousel.state.isDragging = false;
                app.carousel.state.isHorizontalSwipe = false;
                app.carousel.state.startTime = undefined;
            }
        },
        init: function() {
            document.addEventListener("keydown", app.carousel.keypress);
            
            // Add drag/swipe event listeners
            $("#carousel").addEventListener("mousedown", app.carousel.doDown);
            $("#carousel").addEventListener("touchstart", app.carousel.doDown, { passive: true });
            
            $("#carousel").addEventListener("mousemove", app.carousel.doMove);
            $("#carousel").addEventListener("touchmove", app.carousel.doMove, { passive: false });
            
            $("#carousel").addEventListener("mouseup", app.carousel.doUp);
            $("#carousel").addEventListener("touchend", app.carousel.doUp, { passive: false });
            
            // Handle mouse leave to reset state if user drags outside
            $("#carousel").addEventListener("mouseleave", function() {
                $("#carousel").classList.remove('dragging');
                app.carousel.state.downX = undefined;
                app.carousel.state.downY = undefined;
                app.carousel.state.isDragging = false;
                app.carousel.state.isHorizontalSwipe = false;
            });

            // Prevent context menu on long press (optional)
            $("#carousel").addEventListener("contextmenu", function(e) {
                if (app.carousel.state.isDragging) {
                    e.preventDefault();
                }
            });

            app.carousel.reorder();
            app.selected = $(".selected");

            const selected = app.selected;
            const prev = selected.previousElementSibling;
            const prevSecond = prev ? prev.previousElementSibling : null;

            if (prev) {
                app.carousel.removeClass(prev).classList.add('hideLeft');
            }
            if (prevSecond) {
                app.carousel.removeClass(prevSecond).classList.add('hideLeft');
            }
            app.carousel.prevAll(prevSecond).forEach(item => {
                item.className = '';
                item.classList.add('hideLeft');
            });
        },
        state: {}
    }
    app.carousel.init();
})()