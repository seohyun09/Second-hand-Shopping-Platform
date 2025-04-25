package develop.secondhandshop.product;

import develop.secondhandshop.product.dto.ProductRegistRequest;
import develop.secondhandshop.product.dto.ProductResponse;
import develop.secondhandshop.security.UserDetailsImpl;
import develop.secondhandshop.user.dto.AlertRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    private ResponseEntity<List<ProductResponse>> getAllProductsDetail(
            @RequestParam(required = false) String keyword
    ) {
        List<ProductResponse> response = productService.getAllProductsDetail(keyword);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductDetail(@PathVariable Long id) {
        ProductResponse response = productService.getProductDetail(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<ProductResponse>> getUserProductsDetail(@PathVariable Long id) {
        List<ProductResponse> response = productService.getUserProductsDetail(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<String> register(
            @RequestBody ProductRegistRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        productService.register(request, userDetails.user());
        return ResponseEntity.ok().body("상품 등록 성공");
    }

    @PatchMapping("/{id}/alert")
    public ResponseEntity<String> alert(
            @PathVariable Long id,
            @RequestBody AlertRequest request
    ) {
        productService.alert(id, request);
        return ResponseEntity.ok().body("상품 신고 성공");
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<String> block(@PathVariable Long id) {
        productService.block(id);
        return ResponseEntity.ok().body("상품 차단 성공");
    }
}
