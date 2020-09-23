import { RoomURLs } from '../utils/constants';

export const PIXI = global.PIXI;
export const TRAVISO = global.TRAVISO;


const HOUSE_TYPES = [2, 3, 4, 5, 6];

const MapObjectTypeBuildingMap = {
    '2': 'House of Defiance',
    '3': 'House of DAOs',
    '4': 'House of Adoption',
    '5': 'Stress Test Arena',
    '6': 'Raid Guild',
};


function getHouseOnLocation(engine, position) {
    const objectsOnDestination = engine.getObjectsAtLocation(position);
    const [ houseObj ] = objectsOnDestination.filter(({ type }) => HOUSE_TYPES.includes(type));

    if (!houseObj) return {};

    const houseName = MapObjectTypeBuildingMap[houseObj.type];

    return { name: houseName, data: RoomURLs[houseName]};
}


export function initWhateverse(canvas) {

    const pixiRoot = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'transparent',
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });





    // callback function that will be called once everything is loaded and engine instance is ready, default null
    function engineInstanceReadyCallback() {
        document.body.appendChild(pixiRoot.view);
    }

    // callback function that will be called when a tile is selected, default null
    function tileSelectCallback() {

    }

    // callback function that will be called when a tile with an interactive map-object on it is selected, default null
    function objectSelectCallback(obj) {
        engine.moveCurrentControllableToLocation(obj.mapPos);
    }

    // callback function that will be called when any moving object reaches its destination, default null
    function objectReachedDestinationCallback(tile) {
        const house = getHouseOnLocation(engine, tile.mapPos);
        console.log('welcome to ', house.name);

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
        assetsToLoad: ['/assets/assets_characters.json', '/assets/map/tiles/ground.png', '/assets/map/objects/block.png'],
        initialPositionFrame: { x : 0, y : 0, w : window.innerWidth, h : window.innerHeight },
        initialZoomLevel: -0.5,
        mapDraggable: true,
        tileHeight: 74,
        isoAngle: 30,
        objectReachedDestinationCallback,
        otherObjectsOnTheNextTileCallback,
        engineInstanceReadyCallback,
        objectSelectCallback,
        objectUpdateCallback,
        tileSelectCallback
    };
    
    var engine = TRAVISO.getEngineInstance(instanceConfig, { logEnabled: true });
    pixiRoot.stage.addChild(engine);

}