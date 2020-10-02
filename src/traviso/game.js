export const PIXI = global.PIXI;
export const TRAVISO = global.TRAVISO;

const HOUSE_TYPES = [2, 3, 4, 5, 6, 7 ];

const MapObjectTypeBuildingMap = {
    '2': 'House of Defiance',
    '3': 'House of DAOs',
    '4': 'House of Adoption',
    '5': 'Stress Test Arena',
    '6': 'Raid Guild',
    '7': 'loft.radio',
};

function getHouseOnLocation(engine, position) {
    const objectsOnDestination = engine.getObjectsAtLocation(position);
    const [ houseObj ] = objectsOnDestination.filter(({ type }) => HOUSE_TYPES.includes(type));

    if (!houseObj) return {};

    const houseName = MapObjectTypeBuildingMap[houseObj.type];
    return houseName;
}

export function initWhateverse({ onHouseVisit }, parent) {

    const pixiRoot = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'transparent',
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    // callback function that will be called once everything is loaded and engine instance is ready, default null
    function engineInstanceReadyCallback(obj) {
        obj.moveEngine.DEFAULT_SPEED = 10;
        parent.current.appendChild(pixiRoot.view);
    }

    // callback function that will be called when a tile is selected, default null
    function tileSelectCallback() {

    }

    // callback function that will be called when a tile with an interactive map-object on it is selected, default null
    function objectSelectCallback(obj) {
        engine.moveCurrentControllableToLocation(obj.mapPos);
        const house = getHouseOnLocation(engine, obj.mapPos);

        if (house) {
            onHouseVisit(house);
        }
    }

    // callback function that will be called when any moving object reaches its destination, default null
    function objectReachedDestinationCallback(tile) {
        console.log('destination reached!');
    }

    // callback function that will be called when any moving object is in move and there are other objects on the next tile, default null
    function otherObjectsOnTheNextTileCallback(...args) {
        console.log('obj on next tile', args)
    }

    // callback function that will be called everytime an objects direction or position changed, default null
    function objectUpdateCallback(...args) { 
        /**
         * @todo: close the House window once moved?
         */
    }

    /**
     * engine-instance configuration object 
     * @see: http://www.travisojs.com/blog/tutorial/2015/03/15/engine-configuration.html 
     * */
    var instanceConfig = {
        mapDataPath: '/assets/mapData.json', 
        assetsToLoad: [
            '/assets/assets_characters.json',
            '/assets/map/tiles/ground.png',
            '/assets/map/objects/discord.png',
            '/assets/map/objects/battery.png',
            '/assets/map/objects/forum.png',
            '/assets/map/objects/github.png',
            '/assets/map/objects/radio.png',
            '/assets/map/objects/source_cred.png',
            '/assets/map/objects/wiki.png',
            '/assets/map/objects/plants_mini.png',
            '/assets/map/objects/plant_cells_two.png',
            '/assets/map/objects/plant_cells_four.png',
            '/assets/map/objects/building_cell_neon_blue.png',
        ],
        initialPositionFrame: { x : 0, y : 0, w : window.innerWidth, h : window.innerHeight },
        initialZoomLevel: -0.75,
        mapDraggable: false,
        followCharacter: false,
        tileHeight:132,
        isoAngle: 26.3,
        objectReachedDestinationCallback,
        otherObjectsOnTheNextTileCallback,
        engineInstanceReadyCallback,
        objectSelectCallback,
        objectUpdateCallback,
        tileSelectCallback
    };
    
    var engine = TRAVISO.getEngineInstance(instanceConfig, { logEnabled: false });
    pixiRoot.stage.addChild(engine);

}
