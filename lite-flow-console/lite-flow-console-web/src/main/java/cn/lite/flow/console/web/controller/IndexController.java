package cn.lite.flow.console.web.controller;

import cn.lite.flow.console.web.annotation.LoginCheckIgnore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("consoleIndexController")
@RequestMapping("console")
public class IndexController {

	@RequestMapping("index")
	@LoginCheckIgnore
	public String index() {
		System.out.println("===========111==============");
		return "index";
	}

}