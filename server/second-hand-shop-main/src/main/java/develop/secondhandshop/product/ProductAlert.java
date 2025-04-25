package develop.secondhandshop.product;

import develop.secondhandshop.product.dto.ProductResponse;
import develop.secondhandshop.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class ProductAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @ManyToOne
    private Product alertedProduct;

    public ProductAlert(String title, String content, Product product) {
        this.title = title;
        this.content = content;
        this.alertedProduct = product;
    }
}

