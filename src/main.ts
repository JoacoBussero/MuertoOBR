import OBR from "@owlbear-rodeo/sdk";

const EXTENSION_ID = "com.example.estado-muerto";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${EXTENSION_ID}/context-menu`,
    icons: [
      {
        icon: "💀",
        label: "Muerto",
        filter: {
          every: [{ key: "layer", value: "SCENE_ITEM" }],
        },
      },
    ],
    onClick: async (context) => {
      if (context.type !== "SCENE_ITEM") return;

      // Los elementos seleccionados están disponibles directamente en el contexto
      const selectedItems = context.items;
      if (selectedItems.length === 0) return;

      const selectedItem = selectedItems[0]; // Asumiendo que solo se selecciona un elemento
      const isDead = selectedItem.metadata?.[EXTENSION_ID]?.isDead || false;

      const newMetadata = {
        ...selectedItem.metadata,
        [EXTENSION_ID]: { isDead: !isDead },
      };

      const newStyle = {
        ...selectedItem.overriddenStyle,
        filters: !isDead ? [{ type: "GRAYSCALE", amount: 1 }] : [],
      };

      await OBR.scene.items.updateItems([selectedItem], (items) => {
        items.forEach((item) => {
          item.metadata = newMetadata;
          item.overriddenStyle = newStyle;
        });
      });
    },
  });
}

OBR.onReady(() => {
  setupContextMenu();  // Llamar a la función para configurar el menú contextual
});