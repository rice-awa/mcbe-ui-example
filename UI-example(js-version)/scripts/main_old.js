import { world } from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';

//ActionFormData示例
function ACtionFormTest(player) {
	let ACtionForm = new ActionFormData();
	ACtionForm.title('这是窗口标题')
		.body('窗口内容')
		.button('选项1', '这里填材质的路径')
		.button('选项2，可以调用函数', 'textures/items/potato')
		.button('选项3，可以调用函数', 'textures/items/apple')
		.button('密码验证', 'textures/ui/gear');
	ACtionForm.show(player).then((t) => {
		if (t.selection == 0) {
			world.getDimension('overworld').runCommandAsync(`say 这里是从0开始selection[0]代表是选项1`);
		}
		if (t.selection == 1) {
			world.getDimension('overworld').runCommandAsync(`say 选项2`);
			MessageFormTest(player); //调用函数MessageFormTest
		}
		if (t.selection == 2) {
			ModalFormTest(player); //调用函数ModalFormTest
		}
		if (t.selection == 3) {
			Verify(player); //调用函数Verify
		}
	});
}

//MessageFormData示例
function MessageFormTest(player) {
	let MessageForm = new MessageFormData();
	MessageForm.title('标题').body('内容').button1('按钮1').button2('按钮2');
	MessageForm.show(player).then((t) => {
		world.getDimension('overworld').runCommandAsync(`say 索引值为${t.selection}`); //这里索引从0开
		if (t.selection == 0) {
			world.getDimension('overworld').runCommandAsync(`say awa`); //这里索引从0开始，按钮1
		}
		if (t.selection == 1) {
			world.getDimension('overworld').runCommandAsync(`say qwq`); //按钮2
		}
	});
}
//modalFormData示例
function ModalFormTest(player) {
	let ModalForm = new ModalFormData()
		.title('标题部分')
		.dropdown('下拉列表选择', ['选项1', '选项2', '选项3', '选项4'], 1) //这里最后一个数字是默认值，从0开始,这里默认是选项2
		.slider('滑动条数据', 0, 10, 0.1, 5) //这四个数字分别是：最小值，最大值，步长值，默认值
		.textField('输入文本', '提示文字', '默认文本')
		.toggle('是否开启', true); //第二个参数是默认值
	ModalForm.show(player).then((t) => {
		world.getDimension('overworld').runCommandAsync(`say ${t.formValues[2]}`);
		//这个也是从0开始的
		if (t.formValues[3] == true) {
			world.getDimension('overworld').runCommandAsync('say 114514');
		}
	});
}

//密码验证示例，使用modalFormData
function Verify(player) {
	let VerifyForm = new ModalFormData().title('请输入密码').textField('请输入密码', '请输入密码'); //这里是formValues[0]，跟之前一样，从0开始
	VerifyForm.show(player).then((Verify) => {
		if (Verify.formValues[0] == '114514') {
			//"114514"为密码
			world.getDimension('overworld').runCommandAsync(`title ${player.nameTag} title 您的密码正确!`);
		} else {
			world.getDimension('overworld').runCommandAsync(`title ${player.nameTag} title 您的密码不正确!`);
			world.getDimension('overworld').runCommandAsync(`title ${player.nameTag} subtitle 请尝试重新输入`);
		}
	});
}

//使用物品打开ui,主菜单
world.afterEvents.itemUse.subscribe((use) => {
	if (use.itemStack.typeId == 'minecraft:book') {
		ACtionFormTest(use.source);
	}
});
