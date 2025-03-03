import { defineComponent as r, createElementBlock as c, openBlock as s, renderSlot as i, createElementVNode as p, toDisplayString as _, unref as l } from "vue";
import { useI18n as a } from "vue-i18n";
const m = { class: "text-center text-primary text-h6 mt-2 mb-4" }, f = /* @__PURE__ */ r({
  __name: "AppSectionHeader",
  setup(e) {
    const { t } = a();
    return (o, u) => (s(), c("h2", m, [
      i(o.$slots, "default"),
      p("p", null, _(l(t)("text")), 1)
    ]));
  }
});
function n(e) {
  const t = e;
  t.__i18n = t.__i18n || [], t.__i18n.push({
    locale: "",
    resource: {
      en: {
        text: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Text" } }
      },
      fr: {
        text: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Texte" } }
      }
    }
  });
}
typeof n == "function" && n(f);
export {
  f as AppSectionHeader
};
//# sourceMappingURL=components.js.map
