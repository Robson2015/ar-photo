"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supabase = void 0;

var _supabaseJs = require("@supabase/supabase-js");

// lib/supabase.js
var supabaseUrl = 'https://<TON-PROJET>.supabase.co';
var supabaseAnonKey = '<TA-CLEF-ANON>';
var supabase = (0, _supabaseJs.createClient)(supabaseUrl, supabaseAnonKey);
exports.supabase = supabase;
//# sourceMappingURL=supabase.dev.js.map
