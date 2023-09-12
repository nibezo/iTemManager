"object" != typeof JSON && (JSON = {}),
	(function () {
		"use strict";
		var rx_one = /^[\],:{}\s]*$/,
			rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
			rx_three =
				/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			rx_four = /(?:^|:|,)(?:\s*\[)+/g,
			rx_escapable =
				/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			rx_dangerous =
				/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,
			indent,
			meta,
			rep;
		function f(t) {
			return t < 10 ? "0" + t : t;
		}
		function this_value() {
			return this.valueOf();
		}
		function quote(t) {
			return (
				(rx_escapable.lastIndex = 0),
				rx_escapable.test(t)
					? '"' +
					  t.replace(rx_escapable, function (t) {
							var e = meta[t];
							return "string" == typeof e
								? e
								: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
					  }) +
					  '"'
					: '"' + t + '"'
			);
		}
		function str(t, e) {
			var r,
				n,
				o,
				u,
				f,
				a = gap,
				i = e[t];
			switch (
				(i &&
					"object" == typeof i &&
					"function" == typeof i.toJSON &&
					(i = i.toJSON(t)),
				"function" == typeof rep && (i = rep.call(e, t, i)),
				typeof i)
			) {
				case "string":
					return quote(i);
				case "number":
					return isFinite(i) ? String(i) : "null";
				case "boolean":
				case "null":
					return String(i);
				case "object":
					if (!i) return "null";
					if (
						((gap += indent),
						(f = []),
						"[object Array]" === Object.prototype.toString.apply(i))
					) {
						for (u = i.length, r = 0; r < u; r += 1) f[r] = str(r, i) || "null";
						return (
							(o =
								0 === f.length
									? "[]"
									: gap
									? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]"
									: "[" + f.join(",") + "]"),
							(gap = a),
							o
						);
					}
					if (rep && "object" == typeof rep)
						for (u = rep.length, r = 0; r < u; r += 1)
							"string" == typeof rep[r] &&
								(o = str((n = rep[r]), i)) &&
								f.push(quote(n) + (gap ? ": " : ":") + o);
					else
						for (n in i)
							Object.prototype.hasOwnProperty.call(i, n) &&
								(o = str(n, i)) &&
								f.push(quote(n) + (gap ? ": " : ":") + o);
					return (
						(o =
							0 === f.length
								? "{}"
								: gap
								? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}"
								: "{" + f.join(",") + "}"),
						(gap = a),
						o
					);
			}
		}
		"function" != typeof Date.prototype.toJSON &&
			((Date.prototype.toJSON = function () {
				return isFinite(this.valueOf())
					? this.getUTCFullYear() +
							"-" +
							f(this.getUTCMonth() + 1) +
							"-" +
							f(this.getUTCDate()) +
							"T" +
							f(this.getUTCHours()) +
							":" +
							f(this.getUTCMinutes()) +
							":" +
							f(this.getUTCSeconds()) +
							"Z"
					: null;
			}),
			(Boolean.prototype.toJSON = this_value),
			(Number.prototype.toJSON = this_value),
			(String.prototype.toJSON = this_value)),
			"function" != typeof JSON.stringify &&
				((meta = {
					"\b": "\\b",
					"\t": "\\t",
					"\n": "\\n",
					"\f": "\\f",
					"\r": "\\r",
					'"': '\\"',
					"\\": "\\\\",
				}),
				(JSON.stringify = function (t, e, r) {
					var n;
					if (((indent = gap = ""), "number" == typeof r))
						for (n = 0; n < r; n += 1) indent += " ";
					else "string" == typeof r && (indent = r);
					if (
						(rep = e) &&
						"function" != typeof e &&
						("object" != typeof e || "number" != typeof e.length)
					)
						throw new Error("JSON.stringify");
					return str("", { "": t });
				})),
			"function" != typeof JSON.parse &&
				(JSON.parse = function (text, reviver) {
					var j;
					function walk(t, e) {
						var r,
							n,
							o = t[e];
						if (o && "object" == typeof o)
							for (r in o)
								Object.prototype.hasOwnProperty.call(o, r) &&
									(void 0 !== (n = walk(o, r)) ? (o[r] = n) : delete o[r]);
						return reviver.call(t, e, o);
					}
					if (
						((text = String(text)),
						(rx_dangerous.lastIndex = 0),
						rx_dangerous.test(text) &&
							(text = text.replace(rx_dangerous, function (t) {
								return (
									"\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
								);
							})),
						rx_one.test(
							text
								.replace(rx_two, "@")
								.replace(rx_three, "]")
								.replace(rx_four, "")
						))
					)
						return (
							(j = eval("(" + text + ")")),
							"function" == typeof reviver ? walk({ "": j }, "") : j
						);
					throw new SyntaxError("JSON.parse");
				});
	})();

var soundImage =
	"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00\x14\b\x06\x00\x00\x00V2\u00B7/\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x014IDAT8Oc\x188\u00C0\u00C4\u00C4d\u00D8\u00D6\u00D6\u00F6\x1F\u00C6fcc\x0B\x01K\u00E0\x01\u00EC\u0093&M\u00FA\u00BFq\u00E3F\u00B0\u00A6\u00C0\u00C0\u00C0\u00FFK\u0096,\u00F9\u00BF`\u00C1\u0082\u00FFQQQ`18\x00\u0099\u00E6\u00E1\u00E1\u00F1\x1Fd\x03H\x03L\x13\f\u00F8\u00FA\u00FA\u00FE_\u00B1b\x05\\##\u0088\x00\tprr\u0082\u0098p\u00E0\u00EF\u00EF\u00CF\x18\x16\x16\u00F6_LL\u008Ca\u00CA\u0094)\x12jjj\u00EB\u009A\u009A\u009A\u00AC\u0080\x1A\u008D\u0098@\n\u00D05\u00C0\u00C0\u00AAU\u00AB$@r\u00B5\u00B5\u00B5/n\u00DD\u00BAe}\u00EF\u00DE=\u0086\u0084\u0084\u0084s`Mx\u00C0\u00CB\u00EE\u00EEnF}}}0\u00E7\u00D5\u00ABW\f\u00C2\u00C2\u00C2\f\u008441\u0080\u009C\u00F8\u00E3\u00C7\x0F0\u009B\u0097\u0097\u0097\u00E1\u00E9\u00D3\u00A7\u00F85%%%\u00FDwttdX\u00B8p!\u0088\u00CB\u00AE\u00AD\u00AD\u00CDp\u00E6\u00CC\u0099c\u00E0\u0080\x00z\u00F2\u00A8\u0092\u0092\u0092Upp0\x03\u00C8\u00E3 \x00\n\b0\x03\x02\u00D8\u00BB\u00BA\u00BA~\u00BC~\u00FD\u009A\x01\u00E4\\\u00A8\x18\x04\u0080\u0082~\u00D1\u00A2E\x7F\u00D7\u00AF_\u00FF\x0F\u00C4\x07\x19VQQ\x01\u008E'``\u00A0\u00C6\x132044\u00BC\x0E\u008C\u00AF' 60\u00EE\u00FE\u00E5\u00E4\u00E4\u00FC\x07\u00C5!Xr\x14\f\f``\x00\x00d\u00F0wx\u0092\u00B8\u00E3\u00C9\x00\x00\x00\x00IEND\u00AEB`\u0082";
var eyeImage =
	'\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\n\b\x06\x00\x00\x00\u0084\u00D9o\u00C7\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00\u00ECIDAT(S\u00CD\u0090\u00BF\u008EE@\x14\u0087\x7F6\x14\x1A\u00A5B\u00EB\x05$\n-\u0085F\u00C2\x0B(T\u00A2\u00D1z\x18\x0F\u00A0\u0091x\x02\x05\x11\u00A5\u0082B\u00A3\u0090Pj\x14\n\x05\u00C9\u00EC\u009D\u00C9\u00DEb\u00B3n\u00BF_sfr\u00E6;\x7F\u0086\u00C3\x07\f\u00C3 \u009A\u00A6AUU\u009C\u00E7\u0089y\u009E\u00D1\u00F7=\u0086a`\u00CE\u00A3\x18\x04\x01q]\x17\u00D34\u00A1i\x1AH\u0092\x04\u00C7qX.\u00CB2\u0094e\u00C9\u00FD\x11\u00E38&\u00B6mc\u00DB6\u0084a\u00C8\u00F2\u00A6i\u0092\u00FB\u00BE\u0091$\t\u00AE\u00EBB\u009A\u00A6\u00F8b\u00AF\x7Fxua\x12e]W\x16\u00DF\u00B4m\u00CB\u00D1\u0091\x05A\u0080\u00EF\u00FB\u00BFE\u00BAG\u00D7u\u00EC\u00AC(\n\u008B\u0094\u00BA\u00AE\u00B9WA"\u008A"\u00EBX\x14\u00C5\u00F3\u008EQ\x14\x11\u00CB\u00B2\u00B0\u00EF;\u00AA\u00AA\x02\u00CF\u00F3\u00F0<\x0F\u00C7q \u00CF\u00F3\u00E7\x1D\u00DF\u00E8\u00BAN\u00E8\u008F\u00CA\u00B2\u00CC\u00EE\u00CB\u00B2\u00B0\u0089\u00C6q\u00FC\u00E8\u00FCK\u0080o\u00CDk_\u00F3\u00D2\u00CAn\x7F\x00\x00\x00\x00IEND\u00AEB`\u0082';
var sourceImage =
	'\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x13\b\x06\x00\x00\x00\u00A0\x00<\u0094\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\x17iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin="\u00EF\u00BB\u00BF" id="W5M0MpCehiHzreSzNTczkc9d"?> <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 6.0-c006 79.dabacbb, 2021/04/14-00:39:44        "> <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmp:CreatorTool="Adobe Photoshop 22.4 (Windows)" xmp:CreateDate="2022-10-19T15:30:08+03:00" xmp:ModifyDate="2022-10-19T15:56:55+03:00" xmp:MetadataDate="2022-10-19T15:56:55+03:00" dc:format="image/png" photoshop:ColorMode="3" photoshop:ICCProfile="sRGB IEC61966-2.1" xmpMM:InstanceID="xmp.iid:e897ea67-164f-f946-8ab7-b3e4df6f87fc" xmpMM:DocumentID="xmp.did:e897ea67-164f-f946-8ab7-b3e4df6f87fc" xmpMM:OriginalDocumentID="xmp.did:e897ea67-164f-f946-8ab7-b3e4df6f87fc"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action="created" stEvt:instanceID="xmp.iid:e897ea67-164f-f946-8ab7-b3e4df6f87fc" stEvt:when="2022-10-19T15:30:08+03:00" stEvt:softwareAgent="Adobe Photoshop 22.4 (Windows)"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end="r"?>\u00FC5\u00AC\u00C6\x00\x00\x02\x11IDAT8\u008D\u00C5\u0091\u00BDk\x1Aq\x18\u00C7\u00BF\u00CF\u00EF\u00C5\x1E\u00F1\u0094#\u00EA\u00DD\t56\u008B`\u00A1C\u00BA\x04\u00B4N-R\u00ACc\x07\u00A1\x19J\u00BBe\u00CC\x162\n\u00D9\u0092\u00FE\x07\x19\\\u00DA\u00A1K3\u0084\u0082\x7FB\u00FE\u0086l\u00A5E\u0089F\u00CD\u00E5z\u00F6\u00BC{:\u00E4\u00A5\u0086Z\x02Y\u00FA\x1D\x1F\u00F8</\u009F\u0087\u0098\x19\u00F7\u0089\u00B8\x17\u00F5_@X\u0096U\u00EEt:\u00DF\x0E\x0F\x0F\u00B9\\.\u00BF1M\x13\u008E\u00E3\u00C0q\x1C\u00E4\u00F3y\u00D8\u00B6\r!\u00FE\u00EE/\f\u00C3p*\u0095J\u00BA^\u00AF\u00A3X,>\u00CFf\u00B3p]\x17\u00AE\u00EB\u00A2P(\u00C0\u00B2,,\x10H*\u008A\u00A2\u009F\u009E\u00E7a4\x1A\u00C1\u00F3\u00BC\u00EF\u00BE\u00EFCk\r\u00A5\x14\u00FA\u00FD>\u0086\u00C3!\u0094R\b\u00C3\u00F0\u00F6Df\u008E\u00989&"\b!\u0094\x10\x02RJ\x10\x11\u00CE\u00CE\u00CE\x10\u0086\u00E1\u00A2UY\u00D0e@D\x00@\x00\u00A0\u00B5\u00C6d2A\x10\x04\u00D0Z/RC\u008A\u0088\u00D4\u00D5d\\CQ\x14\u00E1\u00F4\u00F4\x14\x000\u009B\u00CD\x16J\x15\x00\u0098\u00AF(\u00A5\x14\u00F9\u00BE\u008F\u00E1px\x03$\x12\t\u00BB\u00D1h|.\u0095J\u00AD[\u00AB2s,\u0084 f\u00C6x<\x1E\x0F\x06\x03\x04A\u0080t:}\u00D9Y\u0088\u00C4\u00E6\u00E6\u00E6\u00CB\u00BD\u00BD\u00BD\u008F\u00B9\\\u00EE\u00C5\u00BC\x1C\u008A\u00E38\u00D6Z#\u0095J=\x02P\u0098N\u00A7%)\u00E5\x13\x00.3?\u00D6Z\u0087\u00CDf\x13\u00BB\u00BB\u00BB\u009Fl\u00DB~\x05\x00J\b!\u00A3(\u00E2\u00E5\u00E5e\u00EC\u00EF\u00EF\u00BF\u00ED\u00F5z\u00AF\u0089H2\u00B3\x00\u00F0\u00CB0\u008C\x07\u00AB\u00AB\u00ABK\x17\x17\x17\u00D8\u00D8\u00D8\u00C8\u00A4R\u00A9/\u00DB\u00DB\u00DB\u00EFT\x1C\u00C7\x14\x04\u0081\x04\u0080\u00B5\u00B55\x05\u00C0\u009A\u00BB%\t\u00E0\u00C6p&\u0093\u00C1\u00CA\u00CA\u008A4M\u00F3!I)\u00CDZ\u00AD\u00D6.\x16\u008B\u00D5 \b|ff"b"\u00A2\u00F3\u00F3s/\u0099L.mmm=[__O\x1C\x1F\x1Fcgg\u00E7\u00A0\u00DB\u00ED\u00BE\u00BF\u00FE\u00DF?\u00A3\u00B5\u00B6\u008F\u008E\u008E~\u009C\u009C\u009Cp\u00B5Z\u00FD\u00F0\u00E7\u0093w\u0080\u00A6i\x16\u00DA\u00ED\u00B6\u00D7j\u00B5\u00BE\u00CE\u0095\u00E9N\u0090\u0088\u00B4a\x18O\u0085\x10\u00CE|\u00FD7\u00F2z\u00CA\u00F1\u00F9\u0080\u00DC1\x00\x00\x00\x00IEND\u00AEB`\u0082';
var replaceImage =
	'\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\u00D1\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\u00F2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin="\u00EF\u00BB\u00BF" id="W5M0MpCehiHzreSzNTczkc9d"?> <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 6.0-c006 79.dabacbb, 2021/04/14-00:39:44        "> <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmp:CreatorTool="Adobe Photoshop 22.4 (Windows)" xmp:CreateDate="2022-10-19T15:39:09+03:00" xmp:ModifyDate="2022-10-19T15:50:27+03:00" xmp:MetadataDate="2022-10-19T15:50:27+03:00" dc:format="image/png" photoshop:ColorMode="3" photoshop:ICCProfile="sRGB IEC61966-2.1" xmpMM:InstanceID="xmp.iid:b0bbeaf1-844d-c64c-bf1e-fe67a29a665e" xmpMM:DocumentID="adobe:docid:photoshop:4f2386fc-041e-b149-8949-32c615da4075" xmpMM:OriginalDocumentID="xmp.did:cb8a6321-8d5d-e341-b96c-dc47e191cd2b"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action="created" stEvt:instanceID="xmp.iid:cb8a6321-8d5d-e341-b96c-dc47e191cd2b" stEvt:when="2022-10-19T15:39:09+03:00" stEvt:softwareAgent="Adobe Photoshop 22.4 (Windows)"/> <rdf:li stEvt:action="saved" stEvt:instanceID="xmp.iid:b0bbeaf1-844d-c64c-bf1e-fe67a29a665e" stEvt:when="2022-10-19T15:50:27+03:00" stEvt:softwareAgent="Adobe Photoshop 22.4 (Windows)" stEvt:changed="/"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end="r"?>\x1D?nq\x00\x00\x01\u00D7IDAT(\u0091\u0085\u00D2M\u00A8\x12Q\x14\x07\u00F0s\u00E7=c\u00F0\u00DAb$\x04?\u00A0A\u00DB95\u0084D\x18\x06\u0086!\x04B \u00ED\\\u00E6s\u00A7\u00D3"\u00B0\u009D\u00B8qS\x1B\x15\u0084\u00C0\u008FM\u00D0\u00B2\u00A0\u008D\x14$H\u0084\u0088\f\u00D1C\u0084\u0081Y\u00C8S\b\x176\u00C8\x1D\u00E1FtZ\u00C4C\u009FMt\u0096\u00E7\u00CF\u00EF\u009E{.\u0097\u0080C\x05\u0083A\b\u0085Bw}>\u00DF\u00C3p8\u00FC\u008Bs~<\x1E\u008F\u00CFt]o\x01\x00\'\u008481\u0080T*\u00F5b:\u009D"c\f\r\u00C3\u00C0\u00C5b\u0081\u009B\u00CD\x06\u00AB\u00D5\u00EA)\x00\x04\x1D\u0091\u00AA\u00AA%\u00CE9\x0E\x06\u0083\u00EF\u008A\u00A2<\x01\u0080\u00EB\u00B2,?\u00A8\u00D5j\u00EF\x11\x11\u00EB\u00F5\u00FA\u00A9\u0093\u00BB\u00DA\u00EF\u00F7q2\u0099\u00A0\u00CB\u00E5\u00BA}\x18\x16\u008B\u00C5\u00B7\u0088\u0088\u0089D\u00E2\u00D9\u00E1\u00B4\u00BCm\u00DBX*\u0095\u00DE8\u009D\u00EAv\u00BB\x13\u00CB\u00E5\x12+\u0095\u00CAka?\u00A0\u0094\x12B\bX\u0096\u00E5\u00B8\u00C6v\u00BB]Z\u0096\x05\u00A2(\u00BA/@\u00D34\u00BF\u00ADV+\u0088\u00C5b\u00D7\u00FE\u00B1\u00FF\u00FDH$\x02\u00A6i\u009E\u00FD\x15\u00E6\u00F3\u00F9W\u008C1\u00CC\u00E5r\u00ED\u00F3\u009E,\u00CB I\u00D2\u00AD\u00D1h\u00F4c>\u009F#\u00A5\u00F4\u00CE\u00F1!\u00E4\u009C\x03\u00A5\x14\u00DA\u00ED\u00F6\u00E3x<~S\u00D7uCUUo6\u009B\u00BD\'I\u0092+\u0093\u00C9<\u00B7m\u00FB\u00F3\u00BE9\u00D24\u00ED\x1D\u00E7\x1C{\u00BD\u009EQ.\u0097?\f\u0087\u00C3\u009F\u00EB\u00F5\x1Ag\u00B3\x19v\u00BB]KQ\u0094\u0093\u00C3AG\u0085Ba\u0088\u0088\u00D8j\u00B5\u00BE\x00\u00C0\x15\u00AF\u00D7\x0B~\u00BF?\x16\u008DF\u009F\x06\x02\u0081G\u0097\u00FE\u00D4N\u0088\u00A2xC\u00D3\u00B4O\u0088\u0088\u00CDfS\x07\u0080\u00CB\x00\x00\u0084\x10\u00D8\u00FFZ\u0094R\u0090$i\x07;\u009D\u00CEG\u00C6\x186\x1A\u008D\u00AF\x00 \u009E\u00F7\x05A\x00A\u00D8=\u00BA\u00C7\u00E3\u00B9\b\u0093\u00C9\u00E4I:\u009D~I)\u0095\u00F7\u00EF\u00FE?\u00F8\x1B\u0095m\u00C0 2rr\u00A1\x00\x00\x00\x00IEND\u00AEB`\u0082';
var partDirectoryScript =
	"~/Documents/Adobe/Script_Files/iTemManager/favouriteNames.json";
var jsonFile = File(partDirectoryScript);

if (!jsonFile.exists) {
	var scriptFolder = new Folder("~/Documents/Adobe/Script_Files/iTemManager/");
	if (!scriptFolder.exists) {
		scriptFolder.create();
	}
	jsonFile.open("w");
	jsonFile.write("");
	jsonFile.close();
}

var isAltPressed = false;

myScript(this);
function myScript(thisObj) {
	function myScript_buildUI(thisObj) {
		var myPanel =
			thisObj instanceof Panel
				? thisObj
				: new Window("palette", "iTem Manager v1.0", undefined);

		res =
			"group { \
            alignment: ['left', 'left'], \
            alignChildren: ['left','left'], \
            orientation: 'column', \
            borderStyle:'raised',\
        replaceGrp: Panel { \
            orientation:'column',\
            alignment: ['left','left'], \
            text:'Replace', \
            ddGroup1: Group{orientation:'row',\
                alignment:['fill','left'],\
                ddImage1:Image{},\
                myText1:DropDownList{alignment:['fill','fill'],preferredSize:[170,20]},\
                    actualDD1:DropDownList{preferredSize:[11,20]},\
            },\
            ddGroup2: Group{orientation:'row',\
                ddImage2:Image{},\
                myText2:EditText{alignment:['fill','fill'],preferredSize:[170,20]},\
                actualDD2:DropDownList{preferredSize:[11,20]},\
            },\
            enableGroup2: Panel {\
                orientation:'column',\
                text:'Change', \
                alignment:['fill','top'],\
                checkBoxM:Checkbox{text:'activate'},\
                checkBoxGroup: Group{orientation:'row',\
                    alignment:['center','top'],\
                    eyeLogo:Image{},\
                    checkBox1:Checkbox{text:''},\
                    soundLogo:Image{},\
                    checkBox2:Checkbox{text:''},\
                    },\
            },\
            buttonGroup: Group{orientation:'row',\
                launchButton:Button{text:'Launch'},\
        },\
    },\
    }";

		myPanel.grp = myPanel.add(res);

		jsonFile.open("r");
		var readJSON = jsonFile.read();
		if (readJSON == "") {
			var parsedJSON = [];
		} else {
			var parsedJSON = JSON.parse(readJSON);
		}

		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "PR_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "CV_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "OS_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "LK_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "MY_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "IH_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "SM_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("item", "EM_");
		myPanel.grp.replaceGrp.ddGroup1.myText1.add("separator");

		myPanel.grp.replaceGrp.ddGroup1.actualDD1.add(
			"item",
			"Delete from presets"
		);
		myPanel.grp.replaceGrp.ddGroup1.actualDD1.add("separator");
		myPanel.grp.replaceGrp.ddGroup2.actualDD2.add("item", "Save to presets");
		myPanel.grp.replaceGrp.ddGroup2.actualDD2.add(
			"item",
			"Delete from presets"
		);
		myPanel.grp.replaceGrp.ddGroup2.actualDD2.add("separator");
		for (var p = 0; p < parsedJSON.length; p++) {
			myPanel.grp.replaceGrp.ddGroup1.actualDD1.add(
				"item",
				"    " + parsedJSON[p] + ""
			);
			myPanel.grp.replaceGrp.ddGroup2.actualDD2.add(
				"item",
				"    " + parsedJSON[p] + ""
			);
		}

		myPanel.grp.replaceGrp.enableGroup2.checkBoxGroup.eyeLogo.image = eyeImage;
		myPanel.grp.replaceGrp.enableGroup2.checkBoxGroup.soundLogo.image =
			soundImage;
		myPanel.grp.replaceGrp.ddGroup1.ddImage1.image = replaceImage;
		myPanel.grp.replaceGrp.ddGroup2.ddImage2.image = sourceImage;

		myPanel.grp.replaceGrp.ddGroup1.actualDD1.onChange = function () {
			if (ScriptUI.environment.keyboardState.altKey) {
				isAltPressed = true;
			}
			if (myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection == 0) {
				if (myPanel.grp.replaceGrp.ddGroup1.myText1.text == "") {
					alert("There are no text you are trying to save to presets");
					reloadDropDownLists();
					return;
				} else {
					jsonFile.open("r");
					var readJSON = jsonFile.read();
					if (readJSON == "") {
						var parsedJSON = [];
					} else {
						var parsedJSON = JSON.parse(readJSON);
					}

					for (var n = 0; n < parsedJSON.length; n++) {
						if (
							parsedJSON[n] ==
							myPanel.grp.replaceGrp.ddGroup1.myText1.text.toString()
						) {
							alert("This preset is already saved");
							reloadDropDownLists();
							return;
						}
					}
					parsedJSON.push(
						myPanel.grp.replaceGrp.ddGroup1.myText1.text.toString()
					);
					jsonFile.close();
					jsonFile.open("w");
					jsonFile.write(JSON.stringify(parsedJSON));
					jsonFile.close();
					reloadDropDownLists();
				}
			} else if (myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection == 1) {
				var whatToDelete = myPanel.grp.replaceGrp.ddGroup1.myText1.text;
				jsonFile.open("r");
				var readJSON = jsonFile.read();
				if (readJSON == "") {
					var parsedJSON = [];
				} else {
					var parsedJSON = JSON.parse(readJSON);
				}
				var newArrayG = [];
				for (var h = 0; h < parsedJSON.length; h++) {
					newArrayG.push(parsedJSON[h]);
				}
				for (var d = newArrayG.length - 1; d >= 0; d--) {
					if (newArrayG[d] == whatToDelete) {
						parsedJSON.splice(d, 1);
					}
				}
				jsonFile.open("w");
				jsonFile.write(JSON.stringify(parsedJSON));
				jsonFile.close();

				reloadDropDownLists();
			} else {
				if (isAltPressed) {
					var mySelectedText =
						myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection
							.toString()
							.substr(
								4,
								myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection.toString()
									.length - 4
							);
					myPanel.grp.replaceGrp.ddGroup1.myText1.text = mySelectedText;
					var whatToDelete = myPanel.grp.replaceGrp.ddGroup1.myText1.text;
					jsonFile.open("r");
					var readJSON = jsonFile.read();
					if (readJSON == "") {
						var parsedJSON = [];
					} else {
						var parsedJSON = JSON.parse(readJSON);
					}
					var newArrayG = [];
					for (var h = 0; h < parsedJSON.length; h++) {
						newArrayG.push(parsedJSON[h]);
					}
					for (var d = newArrayG.length - 1; d >= 0; d--) {
						if (newArrayG[d] == whatToDelete) {
							parsedJSON.splice(d, 1);
						}
					}
					jsonFile.open("w");
					jsonFile.write(JSON.stringify(parsedJSON));
					jsonFile.close();
					reloadDropDownLists();
				} else {
					var mySelectedText =
						myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection
							.toString()
							.substr(
								4,
								myPanel.grp.replaceGrp.ddGroup1.actualDD1.selection.toString()
									.length - 4
							);
					myPanel.grp.replaceGrp.ddGroup1.myText1.text = mySelectedText;
					isAltPressed = false;
					reloadDropDownLists();
				}
			}
		};

		myPanel.grp.replaceGrp.ddGroup2.actualDD2.onChange = function () {
			if (ScriptUI.environment.keyboardState.altKey) {
				isAltPressed = true;
			}
			if (myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection == 0) {
				if (myPanel.grp.replaceGrp.ddGroup2.myText2.text == "") {
					alert("There are no text you are trying to save to presets");
					reloadDropDownLists();
					return;
				} else {
					jsonFile.open("r");
					var readJSON = jsonFile.read();
					if (readJSON == "") {
						var parsedJSON = [];
					} else {
						var parsedJSON = JSON.parse(readJSON);
					}

					for (var n = 0; n < parsedJSON.length; n++) {
						if (
							parsedJSON[n] ==
							myPanel.grp.replaceGrp.ddGroup2.myText2.text.toString()
						) {
							alert("This preset is already saved");
							reloadDropDownLists();
							return;
						}
					}
					parsedJSON.push(
						myPanel.grp.replaceGrp.ddGroup2.myText2.text.toString()
					);
					jsonFile.close();
					jsonFile.open("w");
					jsonFile.write(JSON.stringify(parsedJSON));
					jsonFile.close();

					reloadDropDownLists();
				}
			} else if (myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection == 1) {
				var whatToDelete = myPanel.grp.replaceGrp.ddGroup2.myText2.text;
				jsonFile.open("r");
				var readJSON = jsonFile.read();
				if (readJSON == "") {
					var parsedJSON = [];
				} else {
					var parsedJSON = JSON.parse(readJSON);
				}
				var newArrayG = [];
				for (var h = 0; h < parsedJSON.length; h++) {
					newArrayG.push(parsedJSON[h]);
				}
				for (var d = newArrayG.length - 1; d >= 0; d--) {
					if (newArrayG[d] == whatToDelete) {
						parsedJSON.splice(d, 1);
					}
				}
				jsonFile.open("w");
				jsonFile.write(JSON.stringify(parsedJSON));
				jsonFile.close();

				reloadDropDownLists();
			} else {
				if (isAltPressed) {
					var mySelectedText =
						myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection
							.toString()
							.substr(
								4,
								myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection.toString()
									.length - 4
							);
					myPanel.grp.replaceGrp.ddGroup2.myText2.text = mySelectedText;
					var whatToDelete = myPanel.grp.replaceGrp.ddGroup2.myText2.text;
					jsonFile.open("r");
					var readJSON = jsonFile.read();
					if (readJSON == "") {
						var parsedJSON = [];
					} else {
						var parsedJSON = JSON.parse(readJSON);
					}
					var newArrayG = [];
					for (var h = 0; h < parsedJSON.length; h++) {
						newArrayG.push(parsedJSON[h]);
					}
					for (var d = newArrayG.length - 1; d >= 0; d--) {
						if (newArrayG[d] == whatToDelete) {
							parsedJSON.splice(d, 1);
						}
					}
					jsonFile.open("w");
					jsonFile.write(JSON.stringify(parsedJSON));
					jsonFile.close();

					reloadDropDownLists();
				} else {
					var mySelectedText =
						myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection
							.toString()
							.substr(
								4,
								myPanel.grp.replaceGrp.ddGroup2.actualDD2.selection.toString()
									.length - 4
							);
					myPanel.grp.replaceGrp.ddGroup2.myText2.text = mySelectedText;
					isAltPressed = false;
					reloadDropDownLists();
				}
			}
		};

		function reloadDropDownLists() {
			jsonFile.open("r");
			var readJSON = jsonFile.read();
			if (readJSON == "") {
				var parsedJSON = [];
			} else {
				var parsedJSON = JSON.parse(readJSON);
			}

			for (var ddi = 100; ddi >= 0; ddi--) {
				try {
					myPanel.grp.replaceGrp.ddGroup1.actualDD1.remove(ddi);
					myPanel.grp.replaceGrp.ddGroup2.actualDD2.remove(ddi);
				} catch (e) {}
			}

			myPanel.grp.replaceGrp.ddGroup1.actualDD1.add("item", "Save to presets");
			myPanel.grp.replaceGrp.ddGroup1.actualDD1.add(
				"item",
				"Delete from presets"
			);
			myPanel.grp.replaceGrp.ddGroup1.actualDD1.add("separator");

			myPanel.grp.replaceGrp.ddGroup2.actualDD2.add("item", "Save to presets");
			myPanel.grp.replaceGrp.ddGroup2.actualDD2.add(
				"item",
				"Delete from presets"
			);
			myPanel.grp.replaceGrp.ddGroup2.actualDD2.add("separator");

			for (var p = 0; p < parsedJSON.length; p++) {
				myPanel.grp.replaceGrp.ddGroup1.actualDD1.add(
					"item",
					"    " + parsedJSON[p] + ""
				);
				myPanel.grp.replaceGrp.ddGroup2.actualDD2.add(
					"item",
					"    " + parsedJSON[p] + ""
				);
			}
		}

		myPanel.grp.replaceGrp.buttonGroup.launchButton.onClick = function () {
			app.beginUndoGroup("Script Launch");
			var activeItem = app.project.activeItem;
			var compArray = [];
			var alreadyAlertedNotComp = 0;
			for (var i = 0; i < app.project.selection.length; i++) {
				if (app.project.selection[i] instanceof CompItem) {
					compArray.push(app.project.selection[i]);
				} else {
					alreadyAlertedNotComp++;
				}
			}
			var inputText1 =
				myPanel.grp.replaceGrp.ddGroup1.myText1.selection.toString();
			var inputText2 = myPanel.grp.replaceGrp.ddGroup2.myText2.text;

			if (compArray.length == 0) {
				alert("There are no comps among selected elements");
				return;
			} else if (!myPanel.grp.replaceGrp.ddGroup1.myText1.selection) {
				alert("Please specify layer needed to find");
				return;
			} else if (
				!inputText2 &&
				!myPanel.grp.replaceGrp.enableGroup2.checkBoxM.value
			) {
				alert(
					"Nothing will happen. Please type layer name to replace or check 'activate' checkbox"
				);
				return;
			}

			if (inputText2) {
				var replaceElement = false;
				var foundSovpadenii = 0;
				for (var elem = 1; elem <= app.project.numItems; elem++) {
					if (app.project.item(elem).name == inputText2) {
						foundSovpadenii++;

						var replaceElement = app.project.item(elem);
					}
				}

				if (foundSovpadenii > 1) {
					return;
				} else if (foundSovpadenii == 0) {
					alert(
						"Cant find file with specified name in project panel (second line)"
					);
					return;
				}
			}

			for (var i = 0; i < compArray.length; i++) {
				foundIdenticalLayers = 0;
				for (var select = 1; select <= compArray[i].numLayers; select++) {
					compArray[i].layer(select).selected = false;
				}
				for (var l = 1; l <= compArray[i].numLayers; l++) {
					if (compArray[i].layer(l).name == inputText1) {
						if (foundIdenticalLayers > 0) {
						}
						foundIdenticalLayers++;

						if (foundIdenticalLayers == 1) {
							if (replaceElement) {
								compArray[i].layer(l).replaceSource(replaceElement, true);
							}
							compArray[i].layer(l).selected = true;
						}

						if (myPanel.grp.replaceGrp.enableGroup2.checkBoxM.value) {
							if (
								myPanel.grp.replaceGrp.enableGroup2.checkBoxGroup.checkBox1
									.value
							) {
								compArray[i].layer(l).enabled = true;
							} else {
								compArray[i].layer(l).enabled = false;
							}

							if (
								myPanel.grp.replaceGrp.enableGroup2.checkBoxGroup.checkBox2
									.value
							) {
								compArray[i].layer(l).audioEnabled = true;
							} else {
								compArray[i].layer(l).audioEnabled = false;
							}
						}
					}
				}
			}

			app.endUndoGroup();
		};

		myPanel.layout.layout(true);
		return myPanel;
	}

	var myScriptPal = myScript_buildUI(thisObj);
	if (myScriptPal != null && myScriptPal instanceof Window) {
		myScriptPal.center();
		myScriptPal.show();
		myScriptPal.addEventListener("keydown", function (e) {
			if (ScriptUI.environment.keyboardState.altKey) {
				isAltPressed = true;
			}
		});
		myScriptPal.addEventListener("keyup", function (e) {
			if (!ScriptUI.environment.keyboardState.altKey) {
				isAltPressed = false;
			}
		});
	}
}
