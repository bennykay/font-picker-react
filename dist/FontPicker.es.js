import { FONT_FAMILY_DEFAULT, OPTIONS_DEFAULTS, FontManager } from '@samuelmeuli/font-manager';
import React, { PureComponent } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function getFontId(fontFamily) {
    return fontFamily.replace(/\s+/g, "-").toLowerCase();
}
var FontPicker = (function (_super) {
    __extends(FontPicker, _super);
    function FontPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            expanded: false,
            loadingStatus: "loading",
        };
        _this.componentDidMount = function () {
            _this.fontManager
                .init()
                .then(function () {
                _this.setState({
                    loadingStatus: "finished",
                });
            })["catch"](function (err) {
                _this.setState({
                    loadingStatus: "error",
                });
                console.error("Error trying to fetch the list of available fonts");
                console.error(err);
            });
        };
        _this.componentDidUpdate = function (prevProps) {
            var _a = _this.props, activeFontFamily = _a.activeFontFamily, onChange = _a.onChange;
            if (activeFontFamily !== prevProps.activeFontFamily) {
                _this.setActiveFontFamily(activeFontFamily);
            }
            if (onChange !== prevProps.onChange) {
                _this.fontManager.setOnChange(onChange);
            }
        };
        _this.onClose = function (e) {
            var targetEl = e.target;
            var fontPickerEl = document.getElementById("font-picker" + _this.fontManager.selectorSuffix);
            while (true) {
                if (targetEl === fontPickerEl) {
                    return;
                }
                if (targetEl.parentNode) {
                    targetEl = targetEl.parentNode;
                }
                else {
                    _this.toggleExpanded();
                    return;
                }
            }
        };
        _this.onSelection = function (e) {
            var target = e.target;
            var activeFontFamily = target.textContent;
            if (!activeFontFamily) {
                throw Error("Missing font family in clicked font button");
            }
            _this.setActiveFontFamily(activeFontFamily);
            _this.toggleExpanded();
        };
        _this.setActiveFontFamily = function (activeFontFamily) {
            _this.fontManager.setActiveFont(activeFontFamily);
        };
        _this.generateFontList = function (fonts) {
            var activeFontFamily = _this.props.activeFontFamily;
            var loadingStatus = _this.state.loadingStatus;
            if (loadingStatus !== "finished") {
                return React.createElement("div", null);
            }
            return (React.createElement("ul", { className: "font-list" }, fonts.map(function (font) {
                var isActive = font.family === activeFontFamily;
                var fontId = getFontId(font.family);
                return (React.createElement("li", { key: fontId, className: "font-list-item" },
                    React.createElement("button", { type: "button", id: "font-button-" + fontId + _this.fontManager.selectorSuffix, className: "font-button " + (isActive ? "active-font" : ""), onClick: _this.onSelection, onKeyPress: _this.onSelection }, font.family)));
            })));
        };
        _this.toggleExpanded = function () {
            var expanded = _this.state.expanded;
            if (expanded) {
                _this.setState({
                    expanded: false,
                });
                document.removeEventListener("click", _this.onClose);
            }
            else {
                _this.setState({
                    expanded: true,
                });
                document.addEventListener("click", _this.onClose);
            }
        };
        _this.render = function () {
            var _a = _this.props, activeFontFamily = _a.activeFontFamily, sort = _a.sort;
            var _b = _this.state, expanded = _b.expanded, loadingStatus = _b.loadingStatus;
            var fonts = Array.from(_this.fontManager.getFonts().values());
            if (sort === "alphabet") {
                fonts.sort(function (font1, font2) { return font1.family.localeCompare(font2.family); });
            }
            return (React.createElement("div", { id: "font-picker" + _this.fontManager.selectorSuffix, className: expanded ? "expanded" : "" },
                React.createElement("button", { type: "button", className: "dropdown-button", onClick: _this.toggleExpanded, onKeyPress: _this.toggleExpanded },
                    React.createElement("p", { className: "dropdown-font-family" }, activeFontFamily),
                    React.createElement("p", { className: "dropdown-icon " + loadingStatus })),
                loadingStatus === "finished" && _this.generateFontList(fonts)));
        };
        var _a = _this.props, apiKey = _a.apiKey, activeFontFamily = _a.activeFontFamily, pickerId = _a.pickerId, families = _a.families, categories = _a.categories, scripts = _a.scripts, variants = _a.variants, filter = _a.filter, limit = _a.limit, sort = _a.sort, onChange = _a.onChange;
        var options = {
            pickerId: pickerId,
            families: families,
            categories: categories,
            scripts: scripts,
            variants: variants,
            filter: filter,
            limit: limit,
            sort: sort,
        };
        _this.fontManager = new FontManager(apiKey, activeFontFamily, options, onChange);
        return _this;
    }
    FontPicker.defaultProps = {
        activeFontFamily: FONT_FAMILY_DEFAULT,
        onChange: function () { },
        pickerId: OPTIONS_DEFAULTS.pickerId,
        families: OPTIONS_DEFAULTS.families,
        categories: OPTIONS_DEFAULTS.categories,
        scripts: OPTIONS_DEFAULTS.scripts,
        variants: OPTIONS_DEFAULTS.variants,
        filter: OPTIONS_DEFAULTS.filter,
        limit: OPTIONS_DEFAULTS.limit,
        sort: OPTIONS_DEFAULTS.sort,
    };
    return FontPicker;
}(PureComponent));

export default FontPicker;
//# sourceMappingURL=FontPicker.es.js.map
