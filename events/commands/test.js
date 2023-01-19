import { SlashCommandBuilder } from "discord.js";
import axios from "axios";

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing command")
    .addStringOption((option) =>
      option.setName("nama").setDescription("Nama apa je?")
    );

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = (interaction) => {
  const nama = interaction.options.getString("nama");
  //const api = request(`https://api.popcat.xyz/encode?text=${nama}`);

  axios
    .get(`https://api.popcat.xyz/lyrics?song==${nama}`)
    .then((res) => {
      console.log("RES:", res.data);
	const test = res.data;
	//console.log(test.artist)


      interaction.reply({
        content: test.lyrics,
      });
    })
    .catch((err) => {
      console.log("ERR:", err);
	  interaction.reply({
        content: 'song not found!',
      });
    });

  // if (nama !== null) interaction.reply({ content: 'test' });
  // else
  // 	interaction.reply({
  // 		content: 'Please give me context... -_-',
  // 		ephemeral: true,
  // 	});
};

export { create, invoke };
