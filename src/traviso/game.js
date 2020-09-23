
export const PIXI = global.PIXI;
export const TRAVISO = global.TRAVISO;

export function initWhateverse(canvas) {
    console.log('initializing');

    const pixiRoot = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        // backgroundColor: 'transparent',// 0x464643,
        // resolution: window.devicePixelRatio || 1,
        // autoDensity: true,
        // view: canvas,
    });


    document.body.appendChild(pixiRoot.view);

    /**
     * @todo: asset 1 is interactive...
     */

    /**
     * engine-instance configuration object 
     * @see: http://www.travisojs.com/blog/tutorial/2015/03/15/engine-configuration.html 
     * */
    var instanceConfig = {
        mapDataPath: '/assets/mapData.json', 
        assetsToLoad: [
            '/assets/assets_characters.json',
            '/assets/map/tiles/ground.png', 
            '/assets/map/objects/block.png',
        ],
        initialZoomLevel: 0,
        initialPositionFrame: { x : 0, y : 0, w : window.innerWidth, h : window.innerHeight },
        mapDraggable: true,
        tileHeight: 74,
        isoAngle: 30
    };
    
    var engine = TRAVISO.getEngineInstance(instanceConfig, { logEnabled: true });
    pixiRoot.stage.addChild(engine);

}