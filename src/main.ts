import {
  registerContextMenu,
  getSceneItems,
  setSceneItemOverriddenStyle,
} from "@owlbear-rodeo/sdk";

const EXTENSION_ID = "com.example.estado-muerto";

registerContextMenu(async (context) => {
  if (context.type !== "SCENE_ITEM") return [];

  const sceneItems = await getSceneItems();
  const selectedItem = sceneItems.find((item) => item.id === context.id);
  if (!selectedItem) return [];

  return [
    {
      id: "mark-dead",
      label: "Muerto",
      icon: "💀",
      onClick: async () => {
        const isDead = selectedItem.metadata?.[EXTENSION_ID]?.isDead || false;

        const newMetadata = {
          ...selectedItem.metadata,
          [EXTENSION_ID]: { isDead: !isDead },
        };

        const newStyle = {
          ...selectedItem.overriddenStyle,
          filters: !isDead ? [{ type: "GRAYSCALE", amount: 1 }] : [],
        };

        await setSceneItemOverriddenStyle(selectedItem.id, {
          overriddenStyle: newStyle,
          metadata: newMetadata,
        });
      },
    },
  ];
});
