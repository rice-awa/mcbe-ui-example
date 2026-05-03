// scripts/main.ts
import { world } from "@minecraft/server";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData
} from "@minecraft/server-ui";
function showActionForm(player) {
  const form = new ActionFormData().title("\u8FD9\u662F\u7A97\u53E3\u6807\u9898").body("\u7A97\u53E3\u5185\u5BB9").button("\u9009\u98791", "\u8FD9\u91CC\u586B\u6750\u8D28\u7684\u8DEF\u5F84").button("\u9009\u98792\uFF0C\u53EF\u4EE5\u8C03\u7528\u51FD\u6570", "textures/items/potato").button("\u9009\u98793\uFF0C\u53EF\u4EE5\u8C03\u7528\u51FD\u6570", "textures/items/apple").button("\u5BC6\u7801\u9A8C\u8BC1", "textures/ui/gear");
  form.show(player).then((response) => {
    if (response.canceled) return;
    switch (response.selection) {
      case 0:
        world.sendMessage("say \u9009\u98791 \u88AB\u70B9\u51FB");
        break;
      case 1:
        world.sendMessage("say \u9009\u98792 \u2014 \u6253\u5F00\u53CC\u6309\u94AE\u8868\u5355");
        showMessageForm(player);
        break;
      case 2:
        showModalForm(player);
        break;
      case 3:
        showPasswordVerify(player);
        break;
    }
  }).catch((error) => {
    world.sendMessage(`\xA7c[\u8868\u5355\u9519\u8BEF] ${error.message}`);
  });
}
function showMessageForm(player) {
  const form = new MessageFormData().title("\u6807\u9898").body("\u5185\u5BB9").button1("\u6309\u94AE1").button2("\u6309\u94AE2");
  form.show(player).then((response) => {
    if (response.canceled) return;
    world.sendMessage(`say \u9009\u4E2D\u7684\u7D22\u5F15: ${response.selection}`);
    if (response.selection === 0) {
      world.sendMessage("say \u6309\u94AE1: awa");
    } else if (response.selection === 1) {
      world.sendMessage("say \u6309\u94AE2: qwq");
    }
  }).catch((error) => {
    world.sendMessage(`\xA7c[\u8868\u5355\u9519\u8BEF] ${error.message}`);
  });
}
function showModalForm(player) {
  const form = new ModalFormData().title("\u6807\u9898\u90E8\u5206").dropdown("\u4E0B\u62C9\u5217\u8868\u9009\u62E9", ["\u9009\u98791", "\u9009\u98792", "\u9009\u98793", "\u9009\u98794"], { defaultValueIndex: 1 }).slider("\u6ED1\u52A8\u6761\u6570\u636E", 0, 10, { defaultValue: 5, valueStep: 1 }).textField("\u8F93\u5165\u6587\u672C", "\u63D0\u793A\u6587\u5B57", { defaultValue: "\u9ED8\u8BA4\u503C" }).toggle("\u662F\u5426\u5F00\u542F", { defaultValue: true }).submitButton("\u63D0\u4EA4\u6309\u94AE\u6587\u5B57").divider();
  form.show(player).then((response) => {
    if (response.canceled) return;
    const values = response.formValues;
    world.sendMessage(`say \u6587\u672C\u6846\u5185\u5BB9: ${values?.[2]}`);
    if (values?.[3] === true) {
      world.sendMessage("say \u5F00\u5173\u5DF2\u5F00\u542F \u2014 114514");
    }
  }).catch((error) => {
    world.sendMessage(`\xA7c[\u8868\u5355\u9519\u8BEF] ${error.message}`);
  });
}
function showPasswordVerify(player) {
  const form = new ModalFormData().title("\u8BF7\u8F93\u5165\u5BC6\u7801").textField("\u8BF7\u8F93\u5165\u5BC6\u7801", "\u8BF7\u8F93\u5165\u5BC6\u7801");
  form.show(player).then((response) => {
    if (response.canceled) return;
    if (response.formValues?.[0] === "114514") {
      world.sendMessage(`title ${player.nameTag} title \u5BC6\u7801\u6B63\u786E!`);
    } else {
      world.sendMessage(`title ${player.nameTag} title \u5BC6\u7801\u4E0D\u6B63\u786E!`);
      world.sendMessage(`title ${player.nameTag} subtitle \u8BF7\u5C1D\u8BD5\u91CD\u65B0\u8F93\u5165`);
    }
  }).catch((error) => {
    world.sendMessage(`\xA7c[\u8868\u5355\u9519\u8BEF] ${error.message}`);
  });
}
world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId === "minecraft:book") {
    showActionForm(event.source);
  }
});

//# sourceMappingURL=../debug/main.js.map
