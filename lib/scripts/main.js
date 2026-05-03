import { world } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData, } from "@minecraft/server-ui";
// ActionFormData 示例 — 多选项按钮表单
function showActionForm(player) {
    const form = new ActionFormData()
        .title("这是窗口标题")
        .body("窗口内容")
        .button("选项1", "这里填材质的路径")
        .button("选项2，可以调用函数", "textures/items/potato")
        .button("选项3，可以调用函数", "textures/items/apple")
        .button("密码验证", "textures/ui/gear");
    form.show(player).then((response) => {
        if (response.canceled)
            return;
        switch (response.selection) {
            case 0:
                world.sendMessage("say 选项1 被点击");
                break;
            case 1:
                world.sendMessage("say 选项2 — 打开双按钮表单");
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
        .catch((error) => {
        world.sendMessage(`§c[表单错误] ${error.message}`);
    });
}
// MessageFormData 示例 — 双按钮确认对话框
function showMessageForm(player) {
    const form = new MessageFormData().title("标题").body("内容").button1("按钮1").button2("按钮2");
    form.show(player).then((response) => {
        if (response.canceled)
            return;
        world.sendMessage(`say 选中的索引: ${response.selection}`);
        if (response.selection === 0) {
            world.sendMessage("say 按钮1: awa");
        }
        else if (response.selection === 1) {
            world.sendMessage("say 按钮2: qwq");
        }
    })
        .catch((error) => {
        world.sendMessage(`§c[表单错误] ${error.message}`);
    });
}
// ModalFormData 示例 — 自定义控件表单
function showModalForm(player) {
    const form = new ModalFormData()
        .title("标题部分")
        .dropdown("下拉列表选择", ["选项1", "选项2", "选项3", "选项4"], { defaultValueIndex: 1 })
        .slider("滑动条数据", 0, 10, { defaultValue: 5, valueStep: 1 })
        .textField("输入文本", "提示文字", { defaultValue: "默认值" })
        .toggle("是否开启", { defaultValue: true })
        .submitButton("提交按钮文字")
        .divider();
    form.show(player).then((response) => {
        if (response.canceled)
            return;
        const values = response.formValues;
        world.sendMessage(`say 文本框内容: ${values === null || values === void 0 ? void 0 : values[2]}`);
        if ((values === null || values === void 0 ? void 0 : values[3]) === true) {
            world.sendMessage("say 开关已开启 — 114514");
        }
    })
        .catch((error) => {
        world.sendMessage(`§c[表单错误] ${error.message}`);
    });
}
// 密码验证示例
function showPasswordVerify(player) {
    const form = new ModalFormData().title("请输入密码").textField("请输入密码", "请输入密码");
    form.show(player).then((response) => {
        var _a;
        if (response.canceled)
            return;
        if (((_a = response.formValues) === null || _a === void 0 ? void 0 : _a[0]) === "114514") {
            world.sendMessage(`title ${player.nameTag} title 密码正确!`);
        }
        else {
            world.sendMessage(`title ${player.nameTag} title 密码不正确!`);
            world.sendMessage(`title ${player.nameTag} subtitle 请尝试重新输入`);
        }
    })
        .catch((error) => {
        world.sendMessage(`§c[表单错误] ${error.message}`);
    });
}
// 监听物品使用事件 — 手持书右键打开主菜单
world.afterEvents.itemUse.subscribe((event) => {
    if (event.itemStack.typeId === "minecraft:book") {
        showActionForm(event.source);
    }
});
//# sourceMappingURL=main.js.map