import { world, Player, ItemUseAfterEvent } from "@minecraft/server";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
  ActionFormResponse,
  MessageFormResponse,
  ModalFormResponse,
} from "@minecraft/server-ui";

function tellraw(message: string): void {
  const rawtext = JSON.stringify({ rawtext: [{ text: message }] });
  world.getDimension("overworld").runCommand(`tellraw @a ${rawtext}`);
}

// ActionFormData 示例 — 多选项按钮表单
function showActionForm(player: Player): void {
  const form = new ActionFormData()
    .title("这是窗口标题")
    .body("窗口内容")
    .button("选项1", "这里填材质的路径")
    .button("选项2，可以调用函数", "textures/items/potato")
    .button("选项3，可以调用函数", "textures/items/apple")
    .button("密码验证", "textures/ui/gear");

  form.show(player).then((response: ActionFormResponse) => {
      if (response.canceled) return;

      switch (response.selection) {
        case 0:
          tellraw("选项1 被点击");
          break;
        case 1:
          tellraw("选项2 — 打开双按钮表单");
          showMessageForm(player);
          break;
        case 2:
          showModalForm(player);
          break;
        case 3:
          showPasswordVerify(player);
          break;
      }
    })
    .catch((error: Error) => {
      tellraw(`§c[表单错误] ${error.message}`);
    });
}

// MessageFormData 示例 — 双按钮确认对话框
function showMessageForm(player: Player): void {
  const form = new MessageFormData().title("标题").body("内容").button1("按钮1").button2("按钮2");

  form.show(player).then((response: MessageFormResponse) => {
      if (response.canceled) return;

      tellraw(`选中的索引: ${response.selection}`);
      if (response.selection === 0) {
        tellraw("按钮1: awa");
      } else if (response.selection === 1) {
        tellraw("按钮2: qwq");
      }
    })
    .catch((error: Error) => {
      tellraw(`§c[表单错误] ${error.message}`);
    });
}

// ModalFormData 示例 — 自定义控件表单
function showModalForm(player: Player): void {
  const form = new ModalFormData()
    .title("标题部分")
    .dropdown("下拉列表选择", ["选项1", "选项2", "选项3", "选项4"], { defaultValueIndex: 1 })
    .slider("滑动条数据", 0, 10, { defaultValue: 5, valueStep: 1 })
    .textField("输入文本", "提示文字", { defaultValue: "默认值" })
    .toggle("是否开启", { defaultValue: true })
    .submitButton("提交按钮文字")
    .divider();

  form.show(player).then((response: ModalFormResponse) => {
      if (response.canceled) return;

      const values = response.formValues;
      tellraw(`下拉列表选项: ${values?.[0]}`);
      tellraw(`滑动条数据: ${values?.[1]}`);
      tellraw(`文本框内容: ${values?.[2]}`);
      

      tellraw(values?.[3] === true ? "开关已开启" : "开关未开启");
      
    })
    .catch((error: Error) => {
      tellraw(`§c[表单错误] ${error.message}`);
    });
}

// 密码验证示例
function showPasswordVerify(player: Player): void {
  const form = new ModalFormData().title("请输入密码").textField("请输入密码", "请输入密码");

  form.show(player).then((response: ModalFormResponse) => {
      if (response.canceled) return;

      if (response.formValues?.[0] === "114514") {
        tellraw(`${player.nameTag} 密码正确!`);
      } else {
        tellraw(`${player.nameTag} 密码不正确!`);
        tellraw(`${player.nameTag} 请尝试重新输入`);
      }
    })
    .catch((error: Error) => {
      tellraw(`§c[表单错误] ${error.message}`);
    });
}

// 监听物品使用事件 — 手持书右键打开主菜单
world.afterEvents.itemUse.subscribe((event: ItemUseAfterEvent) => {
  if (event.itemStack.typeId === "minecraft:book") {
    showActionForm(event.source);
  }
});
