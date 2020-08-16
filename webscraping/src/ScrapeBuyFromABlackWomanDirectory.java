import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.*;

/**
 * Scrapes business data from https://www.buyfromablackwomandirectory.org/
 */
public class ScrapeBuyFromABlackWomanDirectory {
    public static void main(String args[]){
        List<ProductInfo> products = new ArrayList<>();
        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\corin\\chromedriver\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 30);
        driver.navigate().to("https://www.buyfromablackwomandirectory.org/directory?fbclid=IwAR3DWlrKc3iaps6B93YCkKFn919KNg2IadFXdQX8Aqqbo4ztq1Fl6eF0-1I");
        WebElement dropDownSelector = driver.findElement(By.xpath("//*[@id=\"comp-kbh1tr7rcollection\"]"));
        List<WebElement> options = dropDownSelector.findElements(By.tagName("option"));
        for(int i = 0 ; i < options.size() ; i++){
            WebElement current = options.get(i);
            String category = current.getText();
            if(!(category.equals("All") || category.equals("Sort by Category"))){
                current.click();
                List<WebElement> businesses = driver.findElements(By.className("style-kbh1u90uinlineContent"));
                for(WebElement business : businesses){
                    //System.out.println(business.toString());
                    System.out.println(business.findElement(By.tagName("div")));
                }
            }
        }
    }
}
