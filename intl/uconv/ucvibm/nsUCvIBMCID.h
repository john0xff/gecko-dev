/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-
 *
 * The contents of this file are subject to the Netscape Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/NPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 *
 * The Original Code is Mozilla Communicator client code.
 *
 * The Initial Developer of the Original Code is Netscape Communications
 * Corporation.  Portions created by Netscape are
 * Copyright (C) 1998 Netscape Communications Corporation. All
 * Rights Reserved.
 *
 * Contributor(s): 
 * IBM Corporation
 *
 * This Original Code has been modified by IBM Corporation.
 * Modifications made by IBM described herein are
 * Copyright (c) International Business Machines
 * Corporation, 1999
 *
 * Modifications to Mozilla code or documentation
 * identified per MPL Section 3.3
 *
 * Date         Modified by     Description of modification
 * 12/09/1999   IBM Corp.       Support for IBM codepages - 850,852,55,857,862,864
 *
 */

#ifndef nsUCvIBMCID_h___
#define nsUCvIBMCID_h___

#include "nsISupports.h"


// Class ID for our CP850ToUnicode charset converter
// {2D524FD0-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP850ToUnicodeCID, 
0x2d524fd0, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our CP852ToUnicode charset converter
// {2D524FD1-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP852ToUnicodeCID, 
0x2d524fd1, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our CP855ToUnicode charset converter
// {2D524FD2-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP855ToUnicodeCID, 
0x2d524fd2, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our CP857ToUnicode charset converter
// {2D524FD3-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP857ToUnicodeCID, 
0x2d524fd3, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our CP862ToUnicode charset converter
// {2D524FD4-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP862ToUnicodeCID, 
0x2d524fd4, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our CP864ToUnicode charset converter
// {2D524FD5-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kCP864ToUnicodeCID, 
0x2d524fd5, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP850 charset converter
// {2D524FD6-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP850CID, 
0x2d524fd6, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP852 charset converter
// {2D524FD7-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP852CID, 
0x2d524fd7, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP855 charset converter
// {2D524FD8-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP855CID, 
0x2d524fd8, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP857 charset converter
// {2D524FD9-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP857CID, 
0x2d524fd9, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP862 charset converter
// {2D524FDA-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP862CID, 
0x2d524fda, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

// Class ID for our UnicodeToCP864 charset converter
// {2D524FDB-AE74-11d3-ABF7-0004ACEEFA51}
NS_DECLARE_ID(kUnicodeToCP864CID, 
0x2d524fdb, 0xae74, 0x11d3, 0xab, 0xf7, 0x0, 0x4, 0xac, 0xee, 0xfa, 0x51);

#endif /* nsUCvIBMCID_h___ */
