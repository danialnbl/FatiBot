import { SlashCommandBuilder } from 'discord.js';
import axios from "axios";

const create = () => {
	const command = new SlashCommandBuilder()
		.setName('pooh')
		.setDescription('Easily make pooh meme')
		.addStringOption((option) =>
			option
                .setName('text1')
                .setDescription('For upper panel of the meme')
                .setRequired(true))
        .addStringOption((option =>
            option
                .setName('text2')
                .setDescription('For bottom panel of the meme')
                .setRequired(true))
        );

	return command.toJSON();
};

const invoke = (interaction) => {
	
    var text1 = interaction.options.getString("text1");
    var text2 = interaction.options.getString("text2");

    text1 = text1.replace(/ /g, '%20');
    text2 = text2.replace(/ /g, '%20');

    axios
    .get(`https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`)
    .then((res) => {
      
	//const pooh = res.data;
    //console.log("RES:", res.data);

    interaction.reply({
        content: `https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`,
      });

    })

    .catch((err) => {
      console.log("ERR:", err);
	  interaction.reply({
        content: 'please give valid value!',
      });
    });

};

export { create, invoke };