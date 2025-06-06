package develop.secondhandshop;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class HelloController {

    @GetMapping
    public RedirectView redirectView() {
        return new RedirectView("http://localhost:3000/main");
    }
}
