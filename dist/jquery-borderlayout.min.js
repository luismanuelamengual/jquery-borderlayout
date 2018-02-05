
(function($) {

    $.fn.borderlayout = function(options) 
    {
        if (!options) { options = {} };
        var northArea = $.extend({collapsible: true, collapsed: false, resizable: true, height: 100, minHeight: 0, maxHeight: 1000, splitterSize: 8, animated: true, animationDuration: 140}, options.northArea || {});
        var southArea = $.extend({collapsible: true, collapsed: false, resizable: true, height: 100, minHeight: 0, maxHeight: 1000, splitterSize: 8, animated: true, animationDuration: 140}, options.southArea || {});
        var westArea = $.extend({collapsible: true, collapsed: false, resizable: true, width: 260, minWidth: 0, maxWidth: 1000, splitterSize: 8, animated: true, animationDuration: 140}, options.westArea || {});
        var eastArea = $.extend({collapsible: true, collapsed: false, resizable: true, width: 260, minWidth: 0, maxWidth: 1000, splitterSize: 8, animated: true, animationDuration: 140}, options.eastArea || {});
        var centerArea = $.extend({}, options.centerArea || {});
        return this.each( function() 
        {
            var $container = $(this);
            $container.data("northArea", northArea); 
            $container.data("southArea", southArea); 
            $container.data("westArea", westArea); 
            $container.data("eastArea", eastArea); 
            $container.data("centerArea", centerArea); 
            initializeContainer($container);
            updateContainer($container);
        });
    }
    
    function initializeContainer ($container)
    {
        //Obtención de configuraciones por zona
        var northAreaConfig = $container.data("northArea"); 
        var southAreaConfig = $container.data("southArea"); 
        var westAreaConfig = $container.data("westArea"); 
        var eastAreaConfig = $container.data("eastArea"); 
        
        //Establecimiento de propiedades al contenedor
        $container.css("position","absolute"); 
        $container.css("overflow", "hidden"); 
        $container.css("top", "0px");
        $container.css("left", "0px");
        $container.css("width", "100%");
        $container.css("height", "100%");

        //Actualizar el contenedor cuando se cambian las dimensiones del contenedor
        $container.resize(function(e) { updateContainer($(this)); });
        
        //Obtención de los contendedores de area
        var $westContainer = $container.children(".borderlayout-container-west");
        var $eastContainer = $container.children(".borderlayout-container-east");
        var $northContainer = $container.children(".borderlayout-container-north");
        var $southContainer = $container.children(".borderlayout-container-south");
        var $centerContainer = $container.children(".borderlayout-container-center");
        
        //Establecimiento de propiedades generales a los contenedores de area
        if ($northContainer.length > 0)
        {
            $northContainer.css("position", "absolute"); 
            $northContainer.css("top", "0px");
            $northContainer.css("left", "0px");
            $northContainer.css("width", "100%");
            $northContainer.css("z-index", 3);
            
            var $northContent = $("<div>");
            $northContent.addClass("borderlayout-content");
            $northContent.css({position: "relative", left: "0px", top: "0px", width: "100%", height: "100%", overflow: "auto"});
            $northContainer.contents().appendTo($northContent);
            $northContainer.append($northContent);
            
            if (northAreaConfig.collapsible || northAreaConfig.resizable)
            {
                $container.append(createSplitter($container, "north"));
            }
        }
        
        if ($southContainer.length > 0)
        {
            $southContainer.css("position", "absolute");
            $southContainer.css("bottom", "0px");
            $southContainer.css("left", "0px");
            $southContainer.css("width", "100%");
            $southContainer.css("z-index", 3);
            
            var $southContent = $("<div>");
            $southContent.addClass("borderlayout-content");
            $southContent.css({position: "relative", left: "0px", top: "0px", width: "100%", height: "100%", overflow: "auto"});
            $southContainer.contents().appendTo($southContent);
            $southContainer.append($southContent);
            
            if (southAreaConfig.collapsible || southAreaConfig.resizable)
            {
                $container.append(createSplitter($container, "south"));
            }
        }
        
        if ($westContainer.length > 0)
        {
            $westContainer.css("position", "absolute");
            $westContainer.css("top", "0px");
            $westContainer.css("left", "0px");
            $westContainer.css("height", "100%");
            $westContainer.css("z-index", 2);
            
            var $westContent = $("<div>");
            $westContent.addClass("borderlayout-content");
            $westContent.css({position: "relative", left: "0px", top: "0px", width: "100%", height: "100%", overflow: "auto"});
            $westContainer.contents().appendTo($westContent);
            $westContainer.append($westContent);
            
            if (westAreaConfig.collapsible || westAreaConfig.resizable)
            {
                $container.append(createSplitter($container, "west"));
            }
        }
        
        if ($eastContainer.length > 0)
        {
            $eastContainer.css("position", "absolute");
            $eastContainer.css("top", "0px");
            $eastContainer.css("right", "0px");
            $eastContainer.css("height", "100%");
            $eastContainer.css("z-index", 2);
            
            var $eastContent = $("<div>");
            $eastContent.addClass("borderlayout-content");
            $eastContent.css({position: "relative", left: "0px", top: "0px", width: "100%", height: "100%", overflow: "auto"});
            $eastContainer.contents().appendTo($eastContent);
            $eastContainer.append($eastContent);
            
            if (eastAreaConfig.collapsible || eastAreaConfig.resizable)
            {
                $container.append(createSplitter($container, "east"));
            }
        }
        
        $centerContainer.css("position", "absolute");
        $centerContainer.css("top", "0px");
        $centerContainer.css("left", "0px");
        $centerContainer.css("width", "100%");
        $centerContainer.css("height", "100%");
        $centerContainer.css("z-index", 1);
        
        var $centerContent = $("<div>");
        $centerContent.addClass("borderlayout-content");
        $centerContent.css({position: "relative", left: "0px", top: "0px", width: "100%", height: "100%", overflow: "auto", padding: "0px", margin: "0px"});
        $centerContainer.contents().appendTo($centerContent);
        $centerContainer.append($centerContent);
    }
    
    function updateContainer ($container, options)
    {
        options = options || {};
        var animated = options.animated? options.animated : false;
        var animationDuration = options.animationDuration? options.animationDuration : 140;

        //Obtención de configuraciones por zona
        var northAreaConfig = $container.data("northArea"); 
        var southAreaConfig = $container.data("southArea"); 
        var westAreaConfig = $container.data("westArea"); 
        var eastAreaConfig = $container.data("eastArea"); 

        var $centerContainer = $container.children(".borderlayout-container-center");
        var $westContainer = $container.children(".borderlayout-container-west");
        var $eastContainer = $container.children(".borderlayout-container-east");
        var $northContainer = $container.children(".borderlayout-container-north");
        var $southContainer = $container.children(".borderlayout-container-south");
        var $westSplitter = $container.children(".borderlayout-splitter-west");
        var $eastSplitter = $container.children(".borderlayout-splitter-east");
        var $northSplitter = $container.children(".borderlayout-splitter-north");
        var $southSplitter = $container.children(".borderlayout-splitter-south");
        
        var containerWidth = $container.width();
        var containerHeight = $container.height();
        var northHeight = ($northContainer.length > 0 && !northAreaConfig.collapsed)? Math.min(northAreaConfig.maxHeight, Math.max(northAreaConfig.minHeight, northAreaConfig.height)) : 0;
        var southHeight = ($southContainer.length > 0 && !southAreaConfig.collapsed)? Math.min(southAreaConfig.maxHeight, Math.max(southAreaConfig.minHeight, southAreaConfig.height)) : 0;
        var westWidth = ($westContainer.length > 0 && !westAreaConfig.collapsed)? Math.min(westAreaConfig.maxWidth, Math.max(westAreaConfig.minWidth, westAreaConfig.width)) : 0;
        var eastWidth = ($eastContainer.length > 0 && !eastAreaConfig.collapsed)? Math.min(eastAreaConfig.maxWidth, Math.max(eastAreaConfig.minWidth, eastAreaConfig.width)) : 0;
        var northSplitterHeight = ($northSplitter.length > 0)? northAreaConfig.splitterSize : 0;
        var southSplitterHeight = ($southSplitter.length > 0)? southAreaConfig.splitterSize : 0;
        var westSplitterWidth = ($westSplitter.length > 0)? westAreaConfig.splitterSize : 0;
        var eastSplitterWidth = ($eastSplitter.length > 0)? eastAreaConfig.splitterSize : 0;
        var centerTop = northHeight + northSplitterHeight;
        var centerBottom = southHeight + southSplitterHeight;
        var centerLeft = westWidth + westSplitterWidth;
        var centerRight = eastWidth + eastSplitterWidth;

        if ((centerLeft + centerRight) > containerWidth)
        {
            if (options.area == "west")
            {
                centerLeft = containerWidth - centerRight;
                westWidth = centerLeft - westSplitterWidth;
            }
            else if (options.area == "east")
            {
                centerRight = containerWidth - centerLeft;
                eastWidth = centerRight - eastSplitterWidth;
            }
            else
            {
                westWidth = 0;
                eastWidth = 0;
                centerLeft = westSplitterWidth;
                centerRight = eastSplitterWidth;
            }
        }

        if ((centerTop + centerBottom) > containerHeight)
        {
            if (options.area == "north")
            {
                centerTop = containerHeight - centerBottom;
                northHeight = centerTop - northSplitterHeight;
            }
            else if (options.area == "south")
            {
                centerBottom = containerHeight - centerTop;
                southHeight = centerBottom - southSplitterHeight;
            }
            else
            {
                northHeight = 0;
                southHeight = 0;
                centerTop = northSplitterHeight;
                centerBottom = southSplitterHeight;
            }
        }

        if ($northContainer.length > 0)
        {
            applyStyles($northContainer, { height: northHeight + "px" }, animated, animationDuration);
            
            if ($northSplitter.length > 0)
            {
                applyStyles($northSplitter, 
                {
                    top: northHeight + "px",
                    height: northSplitterHeight + "px"
                }, animated, animationDuration);
            }
        }
        
        if ($southContainer.length > 0)
        {
            applyStyles($southContainer, { height: southHeight + "px" }, animated, animationDuration);
            
            if ($southSplitter.length > 0)
            {
                applyStyles($southSplitter, 
                {
                    bottom: southHeight + "px",
                    height: southSplitterHeight + "px"
                }, animated, animationDuration);
            }
        }
            
        if ($westContainer.length > 0)
        {
            applyStyles($westContainer, 
            {
                width: westWidth + "px",
                paddingTop: centerTop + "px",
                paddingBottom: centerBottom + "px"
            }, animated, animationDuration);
            
            if ($westSplitter.length > 0)
            {
                applyStyles($westSplitter, 
                {
                    left: westWidth + "px",
                    paddingTop: centerTop + "px",
                    paddingBottom: centerBottom + "px",
                    width: westSplitterWidth + "px"
                }, animated, animationDuration);
            }
        }
           
        if ($eastContainer.length > 0)
        {
            applyStyles($eastContainer, 
            {
                width: eastWidth + "px",
                paddingTop: centerTop + "px",
                paddingBottom: centerBottom + "px"
            }, animated, animationDuration);
            
            if ($eastSplitter.length > 0)
            {
                applyStyles($eastSplitter, 
                {
                    right: eastWidth + "px",
                    paddingTop: centerTop + "px",
                    paddingBottom: centerBottom  + "px",
                    width: eastSplitterWidth + "px"
                }, animated, animationDuration);
            }
        }
         
        applyStyles($centerContainer, 
        {
            paddingTop: centerTop + "px", 
            paddingBottom: centerBottom + "px", 
            paddingLeft: centerLeft + "px",
            paddingRight: centerRight + "px"
        }, animated, animationDuration);
    }
    
    function createSplitter ($container, area)
    {
        var areaConfig = $container.data(area + "Area");
        var isVertical = (area == "west" || area == "east");

        var $splitter = $("<div>");
        $splitter.addClass("borderlayout-splitter");
        $splitter.addClass("borderlayout-splitter-" + area);
        $splitter.addClass("borderlayout-splitter-" + (isVertical?"vertical":"horizontal"));
        $splitter.css("position", "absolute");
        $splitter.css("z-index", 5);
        if (isVertical)
        {
            $splitter.css("top", "0px");
            $splitter.css("height", "100%");
        }
        else
        {
            $splitter.css("left", "0px");
            $splitter.css("width", "100%");
        }

        var $splitterContentArea = $("<div>");
        $splitterContentArea.addClass("borderlayout-splitter-contentarea");
        $splitterContentArea.css("position", "relative");
        $splitterContentArea.css("top", "0px");
        $splitterContentArea.css("left", "0px");
        $splitterContentArea.css("height", "100%");
        $splitterContentArea.css("width", "100%");

        if (areaConfig.resizable)
        {
            $splitterContentArea.css("cursor", isVertical? "ew-resize" : "ns-resize");
            $splitterContentArea.mousedown(function(e)
            {
                var $splitterContentArea = $(this);
                var $splitterOverlay = $("<div>");
                $splitterOverlay.css({position: "absolute", top:"0px", left:"0px", width:"100%", height:"100%", zIndex:8000, cursor: $splitterContentArea.css("cursor")});
                $splitterOverlay.addClass("splitter-overlay");
                $splitterOverlay.mousemove(function(e) {
                    var containerOffset = $container.offset();
                    var x = e.clientX - containerOffset.left;
                    var y = e.clientY - containerOffset.top;
                    var areaConfig = $container.data(area + "Area");
                    switch (area)
                    {
                        case "west":
                            areaConfig.width = x;
                            break;
                        case "east":
                            areaConfig.width = $container.width() - x;
                            break;
                        case "north":
                            areaConfig.height = y;
                            break;
                        case "south":
                            areaConfig.height = $container.height() - y;
                            break;
                    }
                    updateContainer($container, {area: area});
                });
                $splitterOverlay.mouseup(function(e) {
                    var $splitterOverlay = $(this);
                    $splitterOverlay.remove();
                });
                $splitterOverlay.appendTo($("body"));
            });
        }

        if (areaConfig.collapsible)
        {
            var $splitterButton = $("<div>");
            $splitterButton.addClass("borderlayout-splitter-button");
            $splitterButton.mousedown(function(e) { return false; });
            $splitterButton.click(function(e)
            {
                areaConfig.collapsed = !areaConfig.collapsed;
                $container.data(area + "Area", areaConfig);
                updateContainer($container, {area: area, animated: areaConfig.animated, animationDuration: areaConfig.animationDuration});
            });
            $splitterContentArea.append($splitterButton);
        }

        $splitter.append($splitterContentArea);
        return $splitter;
    }
    
    function applyStyles ($object, properties, animated, duration)
    {
        if (!animated)
        {
            $object.css(properties);
        }
        else
        {
            $object.animate(properties, {duration: duration, queue: false});
        }
    }
    
}(jQuery));