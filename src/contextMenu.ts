import OBR from "@owlbear-rodeo/sdk";

const ID = "com.tutorial.initiative-tracker";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/add.svg",  // Asegúrate de tener un icono en la carpeta public
        label: "Add to Initiative",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick() {
      console.log("Item clicked!");
      // Aquí puedes definir qué sucede cuando se hace clic en el ítem
    },
  });
}
