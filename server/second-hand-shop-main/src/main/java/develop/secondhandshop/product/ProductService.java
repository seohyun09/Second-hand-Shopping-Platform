package develop.secondhandshop.product;

import develop.secondhandshop.product.dto.ProductRegistRequest;
import develop.secondhandshop.product.dto.ProductResponse;
import develop.secondhandshop.user.User;
import develop.secondhandshop.user.dto.AlertRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductAlertRepository productAlertRepository;

    public List<ProductResponse> getAllProductsDetail(String keyword) {
        if (keyword != null) {
            return productRepository
                    .searchByKeywordAndAlertLimit(keyword, 5).stream()
                    .map(product -> new ProductResponse(
                            product.getUser().getId(),
                            product.getUser().getName(),
                            product.getId(),
                            product.getName(),
                            product.getContent(),
                            product.getPrice())
                    ).toList();
        }
        return productRepository
                .findAllByAlertCountBefore(5).stream()
                .map(product -> new ProductResponse(
                        product.getUser().getId(),
                        product.getUser().getName(),
                        product.getId(),
                        product.getName(),
                        product.getContent(),
                        product.getPrice())
                ).toList();
    }

    public List<ProductResponse> getUserProductsDetail(Long id) {
        return productRepository.findAllByUserIdAndAlertCountBefore(id, 5).stream()
                .map(product -> new ProductResponse(
                        product.getUser().getId(),
                        product.getUser().getName(),
                        product.getId(),
                        product.getName(),
                        product.getContent(),
                        product.getPrice())
                ).toList();
    }

    public ProductResponse getProductDetail(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
        validateAlertProduct(product);

        User user = product.getUser();
        return new ProductResponse(
                user.getId(),
                user.getName(),
                product.getId(),
                product.getName(),
                product.getContent(),
                product.getPrice()
        );
    }

    private void validateAlertProduct(Product product) {
        if (product.getAlertCount() >= 5) {
            throw new RuntimeException("신고가 누적되어 조회가 불가한 상품입니다.");
        }
    }

    @Transactional
    public void register(ProductRegistRequest request, User user) {
        if (request.price() <= 0) {
            throw new RuntimeException("상품 가격은 0원 보다 커야합니다.");
        }
        Product product = new Product(request.name(), request.content(), request.price(), user);
        productRepository.save(product);
    }

    @Transactional
    public void alert(Long id, AlertRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
        product.plusAlertCount();
        productAlertRepository.save(new ProductAlert(request.alertTitle(), request.alertContent(), product));
    }

    @Transactional
    public void block(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
        product.block();
    }
}
