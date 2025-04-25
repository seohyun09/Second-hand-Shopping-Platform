package develop.secondhandshop.product;

import develop.secondhandshop.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String content;
    private int price;
    private int alertCount;

    @ManyToOne
    private User user;

    public Product(String name, String content, int price, User user) {
        this.name = name;
        this.content = content;
        this.price = price;
        this.user = user;
        this.alertCount = 0;
    }

    public void plusAlertCount() {
        this.alertCount += 1;
    }

    public void block() {
        this.alertCount = 9999;
    }
}
