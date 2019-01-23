/*
 * shiftenter: a jQuery plugin
 * tested on jQuery v1.5.0
 *
 * jquery-shiftenter is a jQuery plugin that makes it easy to allow submitting
 * a form with textareas using a simple press on 'Enter'. Line breaks (newlines)
 * in these input fields can then be achieved by pressing 'Shift+Enter'
 * (alternatively 'Ctrl+Enter'). Additionally a hint is shown.
 *
 * For usage and examples, visit:
 * http://cburgmer.github.com/jquery-shiftenter
 *
 * Settings:
 * 
 * $('textarea').shiftenter({
 *     focusClass: 'shiftenter',             // CSS class used on focus
 *     inactiveClass: 'shiftenterInactive',  // CSS class used when no focus
 *     hint: 'Shift+Enter for line break',   // hint shown
 *     metaKey: 'shift',                     // meta key that triggers a line-break, allowed values: 'shift', 'ctrl'
 *     pseudoPadding: '0 10'                 // padding (bottom, right) of hint text
 * });
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Christoph Burgmer (cburgmer -[at]- ira [*dot*] uka [*dot*] de)
 */
(function($) {
    $.extend({
        shiftenter: {
            settings: {
                focusClass: 'shiftenter',
                inactiveClass: 'shiftenterInactive',
                hint: '',
                metaKey: 'shift',     // Meta key that triggers a line-break, allowed values: 'shift', 'ctrl'
                pseudoPadding: '0 10' // Pseudo-padding to work around webkit/firefox4 resize handler being hidden, follows the CSS padding style
            },
            get_padding: function(padding) {
                // Parse padding and return right & bottom padding
                var padding_right = 0,
                    padding_bottom = 0;
                if (padding) {
                    var padding_list = padding.split(/ +/);
                    switch (padding_list.length) {
                        case 1:
                            padding_bottom = padding_right = parseInt(padding_list[0]);
                            break;
                        case 2:
                            padding_bottom = parseInt(padding_list[0]);
                            padding_right = parseInt(padding_list[1]);
                            break;
                        default:
                            padding_right = parseInt(padding_list[1]);
                            padding_bottom = parseInt(padding_list[2]);
                    }
                }
                return {right: padding_right, bottom: padding_bottom}
            },
            debug: false,
            log: function(msg){
            },
            hasFirebug: "console" in window && "firebug" in window.console,
            hasConsoleLog: "console" in window && "log" in window.console
        }

    });
    // plugin code
    $.fn.shiftenter = function(opts) {
        opts = $.extend({},$.shiftenter.settings, opts);

        return this.each(function() {
            var $el = $(this);

            // Our goal only makes sense for textareas where enter does not trigger submit
            if(!$el.is('textarea')) {
                $.shiftenter.log('Ignoring non-textarea element');
                return;
            }
            // Catch return key without shift to submit form
            $el.bind('keydown.shiftenter', function(event) {
                if (event.keyCode === 13) {
                    var meta_key = opts.metaKey.toLowerCase();
                    
                    if (meta_key == 'shift' && event.shiftKey) {
                        // Nothing to do, browser inserts a return
                        $.shiftenter.log('Got Shift+Enter');

                    } else if (meta_key == 'ctrl' && event.ctrlKey) {
                        $.shiftenter.log('Got Ctrl+Enter');
                        // For Ctrl+Enter we need to manually insert a return
                        // Taken from Tim Down, http://stackoverflow.com/questions/3532313/jquery-ctrlenter-as-enter-in-text-area, CC BY-SA 3.0
                        var val = this.value;
                        if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
                            var start = this.selectionStart;
                            this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
                            this.selectionStart = this.selectionEnd = start + 1;
                        } else if (document.selection && document.selection.createRange) {
                            this.focus();
                            var range = document.selection.createRange();
                            range.text = "\r\n";
                            range.collapse(false);
                            range.select();
                        }
                        return false;

                    } else {
                        $.shiftenter.log('Got Enter, submitting');
                        // Submit form
                        event.preventDefault();
                        $el.blur();
                        $el.parents('form').submit();
                        return false;
                    }
                }
            });

        });
    };
})(jQuery);
