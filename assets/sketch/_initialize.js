class Scene extends THREE.Scene {
	constructor() {
	  super();
	  	// BETA:
		this.fog = new THREE.FogExp2(0xC5C9DB, 0.0003);
	  	this.background = new THREE.Color(0x87CEEB); // Blue-white sky color
	}
  }
  
  class Camera extends THREE.PerspectiveCamera {
	constructor() {
	  super(60, window.innerWidth / window.innerHeight, 0.1, 5000);
	}
  }
  
  class Renderer extends THREE.WebGLRenderer {
	constructor() {
		super({ antialias: true });
		this.shadowMap.autoUpdate = false;
		this.outputEncoding = THREE.sRGBEncoding;
		this.setSize(window.innerWidth, window.innerHeight);	  

		// BETA: 
		this.shadowMap.enabled = true;
		this.shadowMap.type = THREE.VSMShadowMap;
		this.setPixelRatio(0.9); // adjust render quality
	}
  }


  class DirectionalLight extends THREE.DirectionalLight {
	constructor() {
	super(0xffffff);
	this.shadow.camera.top = 500;
	this.shadow.camera.bottom = -500;
	this.shadow.camera.left = -500;
	this.shadow.camera.right = 500;
	this.shadow.camera.near = 1;
	this.shadow.camera.far = 5000;
	// BETA:
	this.shadow.mapSize.set(1024, 1024);
	// this.shadow.bias = -0.001;
	
	this.position.set(100, 500, 600);
	this.target.position.set(0, 0, 0); // Position the target at the center of the world

	this.castShadow = true;
	this.shadow.camera.position.set(-500, 1000, -500); // Adjusted light angle

	// Create a box to visualize the shadow camera frustum
	const shadowCameraHelper = new THREE.CameraHelper(this.shadow.camera);
	this.add(shadowCameraHelper);
	}
}




class Cloud extends THREE.Object3D {
	constructor() {
	  super();
  
	  const cloudMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.13,
	  });
  
	  const cloudMeshes = [];
	  const numDodecahedrons = Math.floor(Math.random() * 2) + 4; // Random number of dodecahedrons (between 4 and 5)
  
	  for (let i = 0; i < numDodecahedrons; i++) {
		const x = Math.random() * 1500 - 750; // Random x position between -500 and 500
		const y = Math.random() * 150 + 130; // Random y position between 100 and 300
		const z = Math.random() * 1500 - 750; // Random z position between -500 and 500
  
		const cloudSize = Math.random() * 32 + 26; // Random size between 50 and 80
		const cloudGeometry = new THREE.DodecahedronGeometry(cloudSize, 0);
		const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

		cloudMesh.position.set(x, y, z);
  
		const scale = cloudSize / 50; // Adjust the scale based on the size
		cloudMesh.scale.set(scale, scale, scale);
  
		cloudMeshes.push(cloudMesh);
	  }
  
	  const cloudGroup = new THREE.Group();
	  cloudGroup.add(...cloudMeshes);
	  this.add(cloudGroup);
	}
  }
  
  



  class Skydome extends THREE.Mesh {
	constructor() {
		const skyGeometry = new THREE.SphereGeometry(1000, 32, 32);
		const skyMaterial = new THREE.ShaderMaterial({
			vertexShader: `
				varying vec3 vWorldPosition;

				void main() {
					vec4 worldPosition = modelMatrix * vec4(position, 1.0);
					vWorldPosition = worldPosition.xyz;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				varying vec3 vWorldPosition;

				void main() {
					float brightness = clamp(vWorldPosition.y / 1000.0, 0.0, 1.0);
					
					// Calculate the gradient based on the vertical position
					float gradient = clamp((vWorldPosition.y + 500.0) / 1000.0, 0.0, 1.0);
					
					// Interpolate between a lighter blue and the bottom blue using the gradient
					vec3 topColor = vec3(0.8, 0.9, 1.0); // Lighter blue color
					vec3 bottomColor = vec3(0.53, 0.81, 0.92); // Bottom blue color
					vec3 skyColor = mix(topColor, bottomColor, gradient);

					gl_FragColor = vec4(skyColor, 1.0);
				}
			`,
			side: THREE.DoubleSide, // Disable backface culling
		});

		super(skyGeometry, skyMaterial);
	}
}




class World {
	constructor(scene, callback) {
		this.scene = scene;
		this.callback = callback;
		new _Loader().parse(_Model, '', this.onLoad, this.onError);
	}

	onLoad = (world) => {
		this.scene.add(world.scene);


		/** Filter Blacklist Mesh Of Model
			let meshGroup = world.scene.children;
			meshGroup = meshGroup.filter(mesh => {
				// don't include in renderer
				return mesh.name !== 'Trees';
			});
			world.scene.children = meshGroup;
		*/

		/** Show Polynomial Count of Model
			let totalPolygonCount = 0;

			world.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				// Access the position attribute of the mesh's geometry
				const positionAttribute = child.geometry.getAttribute('position');
		
				// Get the number of vertices in the mesh's geometry
				const vertexCount = positionAttribute.count;
		
				// Calculate the number of polygons (triangles) based on the number of vertices
				const polygonCount = vertexCount / 3;
		
				totalPolygonCount += polygonCount;
			}
			});

			console.log(`Polycount: ${totalPolygonCount}`);
		*/
	  

		// Prevent material reference duplication bug
		const cloneMaterial = (mesh) => mesh.material.clone();

		const noShadowCast = ['Road', 'Pathway'];
		const noTransparency = ['Road', 'Pathway', 'Trees'];

		for (let child of world.scene.children) {
			if (child instanceof THREE.Group) {
				child.traverse((subchild) => {
					if (subchild instanceof THREE.Mesh) {
						subchild.receiveShadow = true;
						if (!noShadowCast.includes(child.name)) {
							subchild.castShadow = true;
						}
						subchild.material = cloneMaterial(subchild);	
						if (!noTransparency.includes(child.name)) {
							subchild.material.transparent = true;
							subchild.material.opacity = 1;					
						}
					}
				});
			} 
			
			else if (child instanceof THREE.Mesh) {
				// Prevent material reference duplication bug
				child.receiveShadow = true;
				if (!noShadowCast.includes(child.name)) {
					child.castShadow = true;
				}
				child.material = cloneMaterial(child);
				if (!noTransparency.includes(child.name)) {
					child.material.transparent = true;
					child.material.opacity = 1;
				}
			}
		}

		 // Add lights, clouds, and skydome
		this.addLights();
		this.addClouds();
		this.addSkydome();

		// Call a function after world is loaded
		this.callback();
	};
	

	onError = (error) => alert(error);	

	addLights = () => {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);

		const directionalLight = new DirectionalLight(0xffffff, 1);
		this.scene.add(directionalLight);

		const floorLight = new THREE.DirectionalLight(0xffffff, 0.5);
		floorLight.position.set(-100, -200, -100);
		this.scene.add(floorLight);
	};

	addClouds = () => {
		for (let i = 0; i < 30; i++) {
			const cloud = new Cloud();
			this.scene.add(cloud);
		}
	};

	addSkydome = () => {
		const skydome = new Skydome();
		this.scene.add(skydome);
	};
}

  
class Control extends _Control(THREE) {
	constructor(camera, renderer) {
		super(camera, renderer.domElement);
		
		const ACTION = _Control(THREE).ACTION;  
		this.touches.one = ACTION.TOUCH_TRUCK;
		this.touches.two = ACTION.TOUCH_DOLLY_ROTATE;
		this.touches.three = ACTION.NONE;
		this.mouseButtons.left = ACTION.TRUCK;
		this.mouseButtons.right = ACTION.ROTATE;
		this.mouseButtons.middle = ACTION.NONE;
		this.verticalDragToForward = true;
		this.maxPolarAngle = Math.PI / 2 - 0.4;
		this.draggingDampingFactor = 0.08;
		this.dollySpeed = 0.5;
  
		// BETA: 
		//  this.setBoundary(
		// 		new THREE.Box3(
		// 	 	  new THREE.Vector3(-500, -500, -650),
		// 	  	  new THREE.Vector3(700, 0, 300)
		// 		)
		//  );
	}
  
	gotoStart() {  
		this.setLookAt.call(
			this,
			161.54554314966015, // position x
			326.9337838247367, 	// position y
			407.8612083885392, 	// position z
			-5.844098919514494, 	// target x
			8.826516847940953e-15, 	// target y
			-12.078760084756844,	// target z
			false				// transition?
		);

		setTimeout(() => {
			this.setLookAt.call(
				this,
				-122.20639101984354, 
				229.1889747943928, 
				225.44879824122293, 
				-5.844098919514494, 
				8.826516847940953e-15, 
				-12.078760084756844,
				true
			);
		}, 200);
	}
  }
  
  
  // Create the scene, camera, renderer, and control objects
  let scene, camera, renderer, control;
  scene = new Scene();
  camera = new Camera();
  renderer = new Renderer();
  control = new Control(camera, renderer);
  
  // Load the world
  const world = new World(scene, () => {
	control.gotoStart();
	renderer.shadowMap.needsUpdate = true;
  });

    
  // Set up renderer and append to the document
  renderer.render(scene, camera);
  document.getElementsByTagName('BODY')[0].appendChild(renderer.domElement);
  